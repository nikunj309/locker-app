import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native'
import React, { useContext, useState, useEffect, useRef } from 'react'


//context API
import { AppwriteContext } from '../appwrite/AppwriteContext'
import UserPasswordsDetals from '../components/UserPasswordsDetals';
import Modal from "react-native-modal";
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

import Icon from 'react-native-vector-icons/Feather'
import DetailsIcon from 'react-native-vector-icons/MaterialIcons'
import Loading from '../components/Loading';



const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { appwrite } = useContext(AppwriteContext)
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{ $id: string, itemName: string, userName: string, password: string } | null>(null);
  // const [isLoading, setIsLoading] = useState(true)

  // const [posts, setPosts] = useState<Array<{ $id: string, itemName: string, userName: string, password: string , title: string, postType: boolean }>>([]);
  const [posts, setPosts] = useState({ userPasswordsPost: [], userNotePosts: [] });
  // const [posts, setPosts] = useState({});
  const [combinedData, setCombinedData] = useState([]);
  const [userId, setUserId] = useState("")


  const toggleModal = (item: any) => {
    setSelectedPost(item)
    setModalVisible(!isModalVisible);
  };



  useEffect(() => {
    fetchData();
  }, [appwrite, posts, userId]);

  const fetchData = async () => {
    // setIsLoading(true)
    try {
      const userInfo = await appwrite.account.get();
      const slug = userInfo.$id;
      const userId = userInfo.$id;
      setUserId(userId)

      // const UserPasswordPost = await appwrite.getUserPassword(slug);
      const UserPasswordPost = await appwrite.getUserAllData(slug, userId);
      // console.log(UserPasswordPost);

      if (UserPasswordPost && UserPasswordPost.userPasswordsPost.length > 0 && UserPasswordPost?.userNotePosts.length > 0) {
        setPosts(UserPasswordPost);
      }

    } catch (error) {
      console.error('Error fetching user passwords:', error);
    }
  };



  const deleteUserPasswordPost = async () => {

    try {
      if (selectedPost && selectedPost.$id) {
        if (selectedPost.type === 'password') {

          await appwrite.deleteUserPasswordPost(selectedPost.$id);

          // Filter out the deleted post from the 'posts' state
          const updatedPosts = posts.userPasswordsPost.filter((post) => post.$id !== selectedPost.$id);
          setPosts({ ...posts, userPasswordsPost: updatedPosts });
        } else if (selectedPost.type === 'note') {
          await appwrite.deleteUserNotePost(selectedPost.$id);
          const updatedNotePosts = posts.userNotePosts.filter(
            (post) => post.$id !== selectedPost.$id
          );
          setPosts({ ...posts, userNotePosts: updatedNotePosts });
        }

        // Show Snackbar and handle modal visibility
        Snackbar.show({
          text: 'Post Deleted Successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
      setModalVisible(false);
    } catch (error) {
      console.log('post delete problem', error);
    } finally {
      // setIsLoading(false);
    }
  }



  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState({ userPasswordsPost: [], userNotePosts: [] });

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    const filteredPasswordPost = posts.userPasswordsPost.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query.toLowerCase()) ||
        item.userName.toLowerCase().includes(query.toLowerCase())
      // Add other properties you want to search through
    );
    const filteredNotePosts = posts.userNotePosts.filter(
      (item) =>
        item.itemName.toLowerCase().includes(query.toLowerCase()) ||
        item.title.toLowerCase().includes(query.toLowerCase())
      // Add other properties you want to search through
    );
    setFilteredPosts({
      userPasswordsPost: filteredPasswordPost,
      userNotePosts: filteredNotePosts,
    });
  };

  useEffect(() => {
    // Update filtered posts whenever 'posts' or 'searchQuery' changes
    if (searchQuery === '') {
      setFilteredPosts(posts); // Display all posts when search query is empty
    } else {
      handleSearch(searchQuery);
    }
  }, [posts, searchQuery]);


  const combinedFilteredData = [
    ...filteredPosts.userNotePosts,
    ...filteredPosts.userPasswordsPost,
  ];




  const combineData = () => {
    const combined = [
      ...posts.userPasswordsPost.map(item => ({ ...item, type: 'password' })),
      ...posts.userNotePosts.map(item => ({ ...item, type: 'note' }))
    ];
    setCombinedData(combined);
  };


  useEffect(() => {
    combineData();
  }, [posts]);



  const renderItem = ({ item }: any) => (
    <UserPasswordsDetals
      itemName={item.itemName}
      userName={item.userName}
      title={item.title}
      postType={item.postType}
      onPress={() => toggleModal(item)}
    />
  );

  const copyToClipboard = (item: any, type: any) => {
    let text, message;

    // Determine the text and message based on the type
    if (type === 'username') {
      text = item.userName; // Change this to match your item structure
      message = 'Username copied to clipboard';
    } else if (type === 'password') {
      text = item.password; // Change this to match your item structure
      message = 'Password copied to clipboard';
    }
    else if (type === 'note') {
      text = item.noteDescription; // Change this to match your item structure
      message = 'Note copied to clipboard';
    }
    else {
      return;
    }

    Clipboard.setString(text);
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT
    });
  }

  return (
    <>
      {/* {isLoading ? <Loading />
        : */}
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor='grey'
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={searchQuery === '' ? combinedData : combinedFilteredData}
          // data={searchQuery === '' ? combinedData :  filteredPosts.userNotePosts || filteredPosts.userPasswordsPost}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.listContainer}
        />

        <Modal
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          isVisible={isModalVisible}
          swipeDirection="down"
          // onSwipeComplete={toggleModal}
          onSwipeComplete={() => toggleModal(null)}
          animationIn="slideInUp" // Using a simpler animation
          animationOut="slideOutDown" // Using a simpler animation
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          style={styles.modal}
        >
          {!!selectedPost && (
            <View style={styles.modalContent}>
              <View style={styles.center}>
                <View style={styles.barIcon} />
              </View>
              <View style={styles.card}>
                <View style={styles.content}>
                  <Image
                    source={require('../assest/password.png')}
                    style={styles.userImage}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.greetingTitle}>{selectedPost.itemName}</Text>
                    <Text style={styles.emailText}>{selectedPost.userName}</Text>
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={() => copyToClipboard(selectedPost, selectedPost.type === 'password' ? 'username' : 'note')}>
                  <Text style={styles.sliderOptionTitle}>{selectedPost.type === "note" ? "Copy Notes" : "Copy Username or Email"}</Text>
                  <Icon name='copy' size={20} color='black' />
                </TouchableOpacity>
                {selectedPost.type === 'note' ? "" :
                  <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={() => copyToClipboard(selectedPost, 'password')}>
                    <Text style={styles.sliderOptionTitle}>Copy Password</Text>
                    <Icon name='copy' size={20} color='black' />
                  </TouchableOpacity>
                }

                {selectedPost.type === 'note' ?
                  <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={() => navigation.navigate('NoteAddScreen', { postDetails: selectedPost, DetailsNotEditable: true })} >
                    <Text style={styles.sliderOptionTitle}>Details</Text>
                    <DetailsIcon name='read-more' size={24} color='black' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={() => navigation.navigate('Test', { postDetails: selectedPost, DetailsNotEditable: true })} >
                    <Text style={styles.sliderOptionTitle}>Details</Text>
                    <DetailsIcon name='read-more' size={24} color='black' />
                  </TouchableOpacity>
                }

                {selectedPost.type === 'note' ?

                  <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={() => navigation.navigate("NoteAddScreen", { postDetails: selectedPost })}>
                    <Text style={styles.sliderOptionTitle}>Edit</Text>
                    <Icon name='edit' size={20} color='black' />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={() => navigation.navigate("Test", { postDetails: selectedPost })}>
                    <Text style={styles.sliderOptionTitle}>Edit</Text>
                    <Icon name='edit' size={20} color='black' />
                  </TouchableOpacity>
                }


                <TouchableOpacity style={styles.sliderSubOptionContainer} onPress={deleteUserPasswordPost}>
                  <Text style={[styles.sliderOptionTitle, { color: 'red' }]}>Remove</Text>
                  <DetailsIcon name='delete-outline' size={24} color='red' />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </SafeAreaView>
      {/* } */}

    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  listContainer: {
    paddingBottom: 140,
  },

  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#EBEDEF',
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
    margin: 15,
    borderRadius: 8,
    backgroundColor: '#EBEDEF'
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },


  card: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0.8,
    borderColor: '#E5E7E9',
    marginVertical: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
  },
  emailText: {
    color: '#7F8C8D',
    fontSize: 14,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  greetingTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sliderSubOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 1,
    marginVertical: 5,

  },
  sliderOptionTitle: {
    color: '#2C3E50',
    fontSize: 16
  }

});

export default Home