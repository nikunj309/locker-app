import { Animated, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Browse from '../screens/Browse';
import Tools from '../screens/Tools';
import Menu from '../screens/Menu';

import Post from '../screens/Post';

const Tab = createBottomTabNavigator();

// type CustomTabBarButtonProps = {
//   children: React.ReactNode;
//   onPress: () => void;
// }

interface CustomTabBarButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress: () => void;
}



const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e32f45'
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
)

const Tabs = ({ navigation }) => {
  const toggleSlide = () => {
    navigation.navigate("Post")
  }

  return (
    <>
    
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            // elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 90,
            ...styles.shadow
          }
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={require('../assest/Home.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#e32f45' : '#748c94'
                  }}
                />
                {/* <Icon1  name='home' size={30}  color='grey' /> */}
                <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>HOME</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={require('../assest/brouse.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#e32f45' : '#748c94'
                  }}
                />
                {/* <Icon1  name='home' size={30}  color='grey' /> */}
                <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>BROWSE</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name='Post'
          component={Post}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assest/plus.png')}
                resizeMode='contain'
                style={{
                  width: 40,
                  height: 40,
                  tintColor: '#fff'
                }}
              />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} onPress={() => toggleSlide()} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Tools"
          component={Tools}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={require('../assest/tools.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#e32f45' : '#748c94'
                  }}
                />
                {/* <Icon1  name='home' size={30}  color='grey' /> */}
                <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>TOOLS</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                <Image
                  source={require('../assest/menu.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#e32f45' : '#748c94'
                  }}
                />
                {/* <Icon1  name='home' size={30}  color='grey' /> */}
                <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>MENU</Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default Tabs

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})