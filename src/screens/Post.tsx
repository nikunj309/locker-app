import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

const Post = () => {
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isSlideOpen, setIsSlideOpen] = useState(false);

  const navigation = useNavigation()

  useEffect(() => {

      toggleSlide(); // Automatically opens the slide when component mounts
    
  }, []);

  const toggleSlide = () => {
    const initialValue = isSlideOpen ? 1 : 0;
    const finalValue = isSlideOpen ? 0 : 1;

    slideAnimation.setValue(initialValue);

    Animated.spring(slideAnimation, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();

    setIsSlideOpen(!isSlideOpen);
  };

  const slideHeight = slideAnimation.interpolate({
    inputRange: [0,1],
    outputRange: [0, 500], // Change the height as needed
  });

  return (
    <View style={styles.container}>
      <View style={styles.blurBackground} pointerEvents={isSlideOpen ? 'auto' : 'none'}>
        <Animated.View style={[styles.slideContainer, { height: slideHeight }]}>
          <View>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Test')}>
              <View style={styles.content}>
                <Image
                  source={require('../assest/password.png')}
                  style={styles.userImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.greetingTitle}>Passwords</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NoteAddScreen')} >
              <View style={styles.content}>
                <Image
                  source={require('../assest/password.png')}
                  style={styles.userImage}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.greetingTitle}>Create Notes</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  slideContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: '#D6DBDF',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
  },
  greetingTitle: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Post;
