import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AppwriteContext } from '../appwrite/AppwriteContext'
import Loading from '../components/Loading'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'
import MasterPassword from '../components/MasterPassword'


export const Router = () => {
  const [showMasterPassword, setShowMasterPassword] = useState(false)
  // const [isNewUser, setIsNewUser] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const { isLoggedIn, appwrite, setIsLoggedIn } = useContext(AppwriteContext)

  useEffect(() => {
    // appwrite
    //   .getCurrentUser()
    //   .then(response => {
    //     setIsLoading(false)
    //     if (response) {
    //       setIsLoggedIn(true)
    //       // setIsNewUser(false)
    //       setShowMasterPassword(true);
    //     }
    //   })
    //   .catch(_ => {
    //     setIsLoading(false)
    //     setIsLoggedIn(false)
    //   })


    const checkUser = async () => {
      try {
        const response = await appwrite.getCurrentUser();
        if (response) {
          setIsLoggedIn(true);
          setShowMasterPassword(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching user data
      }
    };

    checkUser();

    // const checkNewUser = async () => {
    //   try {
    //     const currentUser = await appwrite.account.get(); // Fetch current user details from Appwrite
    //     // const isNewUser = !currentUser.$id; // Check if the user's email is verified (customize this logic as per your requirements)
    //     setIsLoading(false);
    //     setIsLoggedIn(true); // User is logged in if there's a current user (assuming successful Appwrite setup)
  
    //     if (isNewUser !== Boolean(currentUser.$id)) {
    //       setShowMasterPassword(true); // Show master password setup for new users
    //       setIsNewUser(true)
    //     }
    //   } catch (error) {
    //     setIsLoading(false);
    //     setIsLoggedIn(false);
    //     console.error('Error checking new user:', error);
    //   }
    // };

    // checkNewUser();
  }, [appwrite, setIsLoading, setIsLoggedIn])



  const handleMasterPasswordSuccess = () => {
    setIsLoggedIn(true) // Update authentication status on successful master password verification
    setShowMasterPassword(false) // Hide master password screen after successful verification
  }

  if (isLoading) {
    return <Loading />
  }



  return (
    <NavigationContainer>
      {/* {isLoggedIn ? <AppStack/> : <AuthStack/>} */}


      {isLoggedIn ? (
        showMasterPassword ? (
          <MasterPassword onSuccess={handleMasterPasswordSuccess} />
        ) : (
          <AppStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}
