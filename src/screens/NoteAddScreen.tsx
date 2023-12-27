import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AppwriteContext from '../appwrite/AppwriteContext';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';

interface FormData {
    itemName: string;
    title: string;
    notes: string;
}

const NoteAddScreen = ({ route }) => {
    const { postDetails, DetailsNotEditable } = route.params ?? {};
    const [isEditMode, setIsEditMode] = useState(!DetailsNotEditable);

    const { appwrite } = useContext(AppwriteContext);

    const navigation = useNavigation()


    const [formData, setFormData] = useState<FormData>({
        itemName: postDetails?.itemName || '',
        title: postDetails?.title || '',
        notes: postDetails?.noteDescription || '',
    });


    const handleSubmit = async () => {
        try {
            const userInfo = await appwrite.account.get();
            const userId = userInfo.$id;

            const addUserNotesPost = await appwrite.addUserNotesPost(
                formData.itemName,
                formData.title,
                formData.notes,
                userId,
            )
            if (addUserNotesPost) {
                console.log("succes  hurrre:: addes user NotesPost data");
                navigation.navigate('Home')
            }
        } catch (error) {
            console.error('Error in add Note Post:', error);
            Snackbar.show({
                text: 'Error in add Note Post',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }




    return (
        <View style={styles.container}>
            <View style={styles.itemHeaderContainer}>
                <View style={styles.inputContainer}>
                    <Image source={require('../assest/password.png')} style={styles.userImage} />
                    <TextInput
                        style={[styles.input, !isEditMode && styles.disabledInput]}
                        placeholder="Item Name"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setFormData({ ...formData, itemName: text })}
                        value={formData.itemName}
                        editable={isEditMode}
                    />
                </View>
            </View>

            <Text style={styles.moreDetaileHeader}>Details</Text>
            <View style={styles.detailsMainContainer}>
                <View style={styles.detailsContainer}>
                    <TextInput
                        style={[styles.inputDetails, !isEditMode && styles.disabledInput]}
                        placeholder="title"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setFormData({ ...formData, title: text })}
                        value={formData.title}
                        editable={isEditMode}
                    />
                    <TextInput
                        style={[styles.inputDetails1, !isEditMode && styles.disabledInput]}
                        placeholder="notes"
                        placeholderTextColor="grey"
                        onChangeText={(text) => setFormData({ ...formData, notes: text })}
                        value={formData.notes}
                        editable={isEditMode}
                    />
                </View>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={[styles.saveBtn, !isEditMode && styles.disabledBtn]}
                    onPress={() => {
                        if (isEditMode) {
                            handleSubmit();
                        } else {
                            setIsEditMode(true); // Switch to edit mode
                        }
                    }}
                    disabled={!isEditMode}
                >
                    <Text style={styles.btntext}>{postDetails ? "Edit" : "Save"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancleBtn} onPress={() => {
                    navigation.navigate('Home')
                }}>
                    <Text style={styles.cancleBtntext}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NoteAddScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    },
    input: {
        height: 50,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        // marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        flex: 1,
        color: 'black'
    },
    error: {
        color: 'red',
        // marginBottom: 5,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginRight: 15,
        alignItems: 'center'
    },
    itemHeaderContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    moreDetaileHeader: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 15,
        padding: 5
    },
    inputDetails: {
        height: 50,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        color: 'black',
    },
    inputDetails1: {
        height: 90,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        color: 'black',
    },
    detailsMainContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white'
    },
    detailsContainer: {
        margin: 20,
        gap: 10,
    },
    iconContainer: {
        padding: 8,
    },
    passwordiNputField: {
        height: 50,
        borderColor: '#D3D3D3',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        color: 'black',
        width: '80%'

    },

    passwordInput: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#D3D3D3',
    },
    passwordGenerateContainerLeftPart: {
        flexDirection: 'row',
        gap: 8
    },
    passwordGenerateContainer: {
        flexDirection: 'row',
    },
    passwordGenerateContainerRighPart: {
        marginLeft: 'auto'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    saveBtn: {
        margin: 5,
        padding: 11,
        width: 125,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2ECC71',
        alignItems: 'center',
        backgroundColor: '#2ECC71',
    },
    btntext: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    },
    cancleBtn: {
        margin: 5,
        padding: 11,
        width: 125,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2ECC71',
        alignItems: 'center',
    },
    cancleBtntext: {
        color: '#2ECC71',
        fontSize: 18,
        fontWeight: '600'
    },
    disabledInput: {
        backgroundColor: '#f2f2f2',
        color: '#7F8C8D'
        // ...
    },
    disabledBtn: {
        backgroundColor: '#ABEBC6',
        borderColor: '#ABEBC6'
    },
});