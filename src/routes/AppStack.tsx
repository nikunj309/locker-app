import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from '../navigator/Tabs';
import PasswordGenerator from '../components/PasswordGenerator';
// import PasswordCreateScreen from '../screens/PasswordCreateScreen';
import Test from '../screens/PasswordCreateScreen1'

import Icon from 'react-native-vector-icons/Ionicons'
import NoteAddScreen from '../screens/NoteAddScreen';
import NotePostsShowScreen from '../screens/NotePostsShowScreen';
import PasswordPostShowScreen from '../screens/PasswordPostShowScreen';

export type AppSatckParamsList = {
  Tabs: undefined;
  PasswordGenerator: undefined;
  // PasswordCreateScreen: undefined;
  Test: undefined;
  NoteAddScreen: undefined;
  NotePostsShowScreen: undefined;
  PasswordPostShowScreen: undefined;

}


type StackNavigationProp = NativeStackNavigationProp<AppSatckParamsList>;

type ScreenProps = {
  navigation: StackNavigationProp;
};

const Stack = createNativeStackNavigator<AppSatckParamsList>();

export const AppStack: React.FC = () => {
  return (

    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name='Tabs' component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen
        name='PasswordGenerator'
        component={PasswordGenerator}
        options={({ navigation }) => ({
          title: 'Password Generator',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='chevron-back-outline' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      {/* <Stack.Screen name='PasswordCreateScreen'
        component={PasswordCreateScreen}
        options={({ navigation }: ScreenProps) => ({
          title: 'Add Password',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name='chevron-back-outline' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      /> */}
      <Stack.Screen name='Test'
        component={Test}
        options={({ navigation }: ScreenProps) => ({
          title: 'Add Password',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name='chevron-back-outline' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name='PasswordPostShowScreen'
        component={PasswordPostShowScreen}
        options={({ navigation }) => ({
          title: 'Notes',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
              <Icon name='chevron-back-outline' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name='NoteAddScreen'
        component={NoteAddScreen}
        options={({ navigation }) => ({
          title: 'Add Note',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name='chevron-back-outline' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name='NotePostsShowScreen'
        component={NotePostsShowScreen}
        options={({ navigation }) => ({
          title: 'Notes',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
              <Icon name='chevron-back-outline' size={24} color='black' />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>

  )
}
