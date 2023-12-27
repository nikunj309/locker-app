import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppwriteContext from '../appwrite/AppwriteContext'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Snackbar from 'react-native-snackbar';


interface LogoutButtonProps {
  onPress: () => void;
  // Add other props if needed
}


const LogoutButton: React.FC<LogoutButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        <Icon name='logout' size={24} color='black' />
        <Text style={styles.logoutText}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
};


const Menu = () => {
  const [UserEmail, setUserEmail] = useState('')
  const [userPhoto, setUserPhoto] = useState('');

  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext)


  const fetchEmail = async () => {
    if (isLoggedIn) {
      try {
        const userInfo = await appwrite.account.get();
        const UserEmailId = userInfo.email;
        const userPhotoUrl = userInfo.prefs.avatar || '';
        setUserPhoto(userPhotoUrl)
        setUserEmail(UserEmailId)
      } catch (error) {
        console.error('Error fetching user email:', error);
      }

    }
  }

  useEffect(() => {
    fetchEmail();
  }, [])


  const handleLogout = () => {
    appwrite.logout()
      .then(() => {
        setIsLoggedIn(false);
        Snackbar.show({
          text: 'Logout Successful',
          duration: Snackbar.LENGTH_SHORT
        })
      })
  }

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.content}>
          {userPhoto ? (
            <Image
              source={{ uri: userPhoto }}
              style={styles.userImage}
            />
          ) : (
            <Image
              source={require('../assest/man.png')}
              style={styles.userImage}
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.greetingTitle}>Hello,</Text>
            <Text style={styles.emailText}>{UserEmail}</Text>
          </View>
        </View>
      </View>

      <LogoutButton onPress={handleLogout} />
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
  },
  emailText: {
    color: 'black',
    fontSize: 16,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  greetingTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e32f45',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutText: {
    color: '#e32f45',
    fontSize: 16,
    fontWeight: 'bold',
  },
})