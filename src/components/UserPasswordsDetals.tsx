import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

interface Props {
    itemName?: string;
    userName?: string;
    onPress?: () => void;
    title?: string;
    postType?: boolean;
}

const UserPasswordsDetals: React.FC<Props>  = ({ itemName, userName, onPress, title, postType }) => {
    return (
            <View>
                <TouchableOpacity style={styles.card} onPress={onPress}>
                    <View style={styles.content}>
                        <Image
                            source={require('../assest/password.png')}
                            style={styles.userImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.greetingTitle}>{itemName}</Text>
                            <Text style={styles.emailText}>{postType ? title : userName}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
    )
}

export default UserPasswordsDetals

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 0.8,
        borderColor: '#E5E7E9',
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
        color: '#B2BEB5',
        fontSize: 14,
        flexWrap: 'wrap',
        maxWidth: 200,
    },
    greetingTitle: {
        color: 'black',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
})