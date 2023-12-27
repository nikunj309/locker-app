import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Platform } from 'react-native'
import React, { useContext, useState } from 'react'

//react native elements
import { FAB } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'

//context API
import { AppwriteContext } from '../appwrite/AppwriteContext'

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../routes/AuthStack';


import Icon from 'react-native-vector-icons/Fontisto'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/EvilIcons'


type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>




const Signup = ({ navigation }: SignupScreenProps) => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext)

  const [error, setError] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const handleSignup = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError('All fields are required');
    } else if (password !== repeatPassword) {
      setError('Passwords do not match');
    } else {
      const user = {
        email,
        password,
        name,
      };
      appwrite
        .createAccount(user)
        .then((response: any) => {
          if (response) {
            setIsLoggedIn(true)
            Snackbar.show({
              text: 'Signup success',
              duration: Snackbar.LENGTH_SHORT
            })
          }
        })
        .catch(e => {
          console.log(e);
          setError(e.message)

        })

    }
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ gap: 2 }}>
          <Text style={styles.appName}>Create Account</Text>
          <Text style={styles.appSubName}>Create a new account</Text>
        </View>
        {/* Name */}
        {/* <TextInput
          value={name}
          onChangeText={text => {
            setError('');
            setName(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Name"
          style={styles.input}
        /> */}


        <View style={{ alignSelf: 'center' }}>
          <View style={styles.emailIcon}>
          <Icon3 style={{ padding: 10 }} name='user' size={35} color='grey' />
            <TextInput
              value={name}
              onChangeText={text => {
                setError('');
                setName(text);
              }}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Name"
              style={styles.input}
            />
          </View>
          {/* Email */}
          <View style={styles.emailIcon}>
            <Icon style={{ padding: 10 }} name='email' size={30} color='grey' />
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Email"
              style={styles.input}
            />
          </View>


          {/* Password */}
          <View style={styles.emailIcon}>
            <Icon2 style={{ padding: 10 }} name='lock' size={30} color='grey' />
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
          </View>
          <View style={styles.emailIcon}>
            <Icon2 style={{ padding: 10 }} name='lock' size={30} color='grey' />
            <TextInput
              secureTextEntry
              value={repeatPassword}
              onChangeText={text => {
                setError('');
                setRepeatPassword(text);
              }}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Repeat Password"
              style={styles.input}
            />
          </View>
        </View>


        {/* Email */}
        {/* <TextInput
          value={email}
          keyboardType="email-address"
          onChangeText={text => {
            setError('');
            setEmail(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Email"
          style={styles.input}
        /> */}

        {/* Password */}
        {/* <TextInput
          value={password}
          onChangeText={text => {
            setError('');
            setPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
        /> */}

        {/* Repeat password */}
        {/* <TextInput
          secureTextEntry
          value={repeatPassword}
          onChangeText={text => {
            setError('');
            setRepeatPassword(text);
          }}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Repeat Password"
          style={styles.input}
        /> */}

        {/* Validation error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Signup button */}
        <Pressable
          onPress={handleSignup}
          style={[styles.btn, { marginTop: error ? 10 : 20 }]}>
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>

        {/* Login navigation */}
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginContainer}>
          <Text style={styles.haveAccountLabel}>
            Already have an account?{'  '}
            <Text style={styles.loginLabel}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    height: '100%',
  },
  appName: {
    color: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  appSubName: {
    color: 'grey',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "black"
  },
  emailIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,
  },
  btn: {
    backgroundColor: 'blue',
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    // padding: 10,
    height: 45,
    alignSelf: 'center',
    borderRadius: 5,
    width: '80%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 3,
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 60,
  },
  haveAccountLabel: {
    color: '#484848',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loginLabel: {
    color: '#1d9bf0',
  },
});

export default Signup
