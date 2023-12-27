import { StyleSheet } from 'react-native'
import React from 'react'
import FormComponent from '../components/FormComponent'

const Browse = ({navigation}: any) => {
  const passwordImage = require('../assest/password.png');
  const handleNavigate =() => {
    navigation.navigate('NotePostsShowScreen')
  }
  const PasswordPostShowScreen =() => {
    navigation.navigate('PasswordPostShowScreen')
  }
  return (
    <>
      <FormComponent title="Password" imageSource={passwordImage}  
      onPress={PasswordPostShowScreen}
      />
      <FormComponent title="Secure Notes" imageSource={passwordImage} onPress={handleNavigate}/>
      <FormComponent title="Cards" imageSource={passwordImage} />
      <FormComponent title="Trash" imageSource={passwordImage} />
    </>
  )
}

export default Browse

const styles = StyleSheet.create({

})