import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface FormComponentProps {
    title: string;
    imageSource: any;
    onPress?: () => void;
  }

const FormComponent: React.FC<FormComponentProps> = ({title, imageSource, onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.content}>
          <Image
            source={imageSource}
            style={styles.userImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greetingTitle}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default FormComponent

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        paddingVertical: 2,
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
        marginTop: 10,
      },
      content: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
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
})