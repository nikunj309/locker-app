import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PasswordGenerator from '../components/PasswordGenerator'
import { useNavigation } from '@react-navigation/native'

const Tools = () => {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PasswordGenerator')}>
        <View style={styles.content}>
          <Image
            source={require('../assest/password.png')}
            style={styles.userImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greetingTitle}>Password Generator</Text>
            <Text style={styles.emailText}>Generate strong & secure passwords</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} >
        <View style={styles.content}>
          <Image
            source={require('../assest/password.png')}
            style={styles.userImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greetingTitle}>Create Notes</Text>
            <Text style={styles.emailText}>Create secure Notes</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Tools

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
    // marginBottom: 1,
    marginTop: 10,
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
    color: '#B2BEB5',
    fontSize: 14,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  greetingTitle: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
})