import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AppwriteContext from '../appwrite/AppwriteContext';
import Snackbar from 'react-native-snackbar';
import Loading from './Loading';
import Icon from 'react-native-vector-icons/Ionicons'

const MasterPassword = ({ onSuccess }: { onSuccess: () => void }) => {
    const [masterPassword, setMasterPassword] = useState('');
    const [userEmail, setUserEmail] = useState('')
    const [existMasterPassword, setExistMasterPassword] = useState('')
    const [isLoading, setisLoading] = useState(true)
    const [showPassword, setShowPassword] = useState(false);

    const { appwrite, isLoggedIn } = useContext(AppwriteContext);

    // const handleLogin = async () => {

    //     if (isLoggedIn) {
    //         try {
    //             const userInfo = await appwrite.account.get();
    //             const userId = userInfo.$id;

    //             const password = await appwrite
    //                 .getUserMasterPassword(userId)


    //                 if(password === masterPassword){
    //                      onSuccess();
    //                 }

    //         } catch (error) {
    //             console.error('Error fetching userId:', error);
    //         }

    //     }

    // };


    // const handleCreatePassword = async () => {
    //     if (isLoggedIn && masterPassword) {
    //       try {
    //         const userInfo = await appwrite.account.get();
    //         const userId = userInfo.$id;

    //         const created = await appwrite.createUserMasterPassword(userId, masterPassword, ID.unique());

    //         if (created) {
    //           console.log('Master password created successfully');
    //           onSuccess();
    //           Snackbar.show({
    //             text: 'Master password created successfully',
    //             duration: Snackbar.LENGTH_SHORT,
    //           });
    //         } else {
    //           console.log('Error creating master password');
    //           Snackbar.show({
    //             text: 'Error creating master password',
    //             duration: Snackbar.LENGTH_SHORT,
    //           });
    //         }
    //       } catch (error) {
    //         console.error('Error creating master password:', error);
    //         Snackbar.show({
    //           text: 'Error creating master password',
    //           duration: Snackbar.LENGTH_SHORT,
    //         });
    //       }
    //     } else {
    //         console.log('Invalid master password');
    //         Snackbar.show({
    //             text: 'Invalid master password',
    //             duration: Snackbar.LENGTH_SHORT,
    //         });
    //     }
    //   };


    useEffect(() => {
        // Handle potential errors during Appwrite initialization
        async function fetchUserInfo() {
            try {
                const userInfo = await appwrite.account.get();
                const userId = userInfo.$id;
                const MasterPassword = await appwrite.getUserMasterPassword(userId);
                setExistMasterPassword(MasterPassword);
                setUserEmail(userInfo.email);
                setisLoading(false);
            } catch (error) {
                console.log("Can't find email id:", error);
            }
        }

        if (!appwrite) {
            console.error('Appwrite client not initialized');
            return;
        }

        fetchUserInfo()
    }, [appwrite]);



    const handleLogin = async () => {
        if (!isLoggedIn) {
            Snackbar.show({
                text: 'Please log in first',
                duration: Snackbar.LENGTH_SHORT,
            });
            return;
        }

        try {
            const userInfo = await appwrite.account.get();
            const userId = userInfo.$id;
            const password = await appwrite.getUserMasterPassword(userId);

            if (password === masterPassword) {
                onSuccess();
            } else {
                Snackbar.show({
                    text: 'Invalid master password',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } catch (error) {
            console.error('Error fetching userId or password:', error);
            Snackbar.show({
                text: 'Error checking master password',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    const handleCreatePassword = async () => {
        if (!isLoggedIn || !masterPassword) {
            Snackbar.show({
                text: 'Invalid state for creating password',
                duration: Snackbar.LENGTH_SHORT,
            });
            return;
        }

        try {
            const userInfo = await appwrite.account.get();
            const userId = userInfo.$id;

            const created = await appwrite.createUserMasterPassword(
                userId,
                masterPassword,
                userInfo.$id
            );

            if (created) {
                console.log('Master password created successfully');
                onSuccess();
                Snackbar.show({
                    text: 'Master password created successfully',
                    duration: Snackbar.LENGTH_SHORT,
                });
            } else {
                console.error('Error creating master password');
                Snackbar.show({
                    text: 'Error creating master password',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } catch (error) {
            console.error('Error creating master password:', error);
            Snackbar.show({
                text: 'Error creating master password',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };


    return (
        <>
            {isLoading ? (<Loading />) : (
                <View style={styles.container}>
                    <Text style={styles.greeting}>Welcome{!existMasterPassword ? ' New User!' : ' Back!'}</Text>
                    <Text style={styles.message}>
                        {!existMasterPassword
                            ? 'Create a Master Password to secure your account:'
                            : 'Please enter your Master Password to continue:'}
                    </Text>
                    <Text style={styles.userEmail}>{userEmail}</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.passwordInput}>
                            <TextInput
                                secureTextEntry={!showPassword}
                                placeholder={!existMasterPassword ? 'Create Master Password' : 'Enter Master Password'}
                                placeholderTextColor="grey"
                                value={masterPassword}
                                onChangeText={(text) => setMasterPassword(text)}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
                                {showPassword ? <Icon name='eye-off-outline' size={24} color='black' /> : <Icon name='eye-outline' size={24} color='black' />}
                            </TouchableOpacity>

                        </View>
                        <Button
                            title={!existMasterPassword ? 'Create Password' : 'Unlock'}
                            onPress={!existMasterPassword ? handleCreatePassword : handleLogin}
                        />
                    </View>
                </View>
            )}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    inputContainer: {
        width: '100%',
        maxWidth: 300,
    },
    input: {
        justifyContent:'center',
        alignItems:'center',
        color: 'black',
    },
    userEmail: {
        color: 'black',
        padding: 4,
        paddingHorizontal: 35,
        backgroundColor: '#D6DBDF',
        flexWrap: 'wrap',
        marginVertical: 10,
        borderRadius: 20,
        borderColor: 'grey',
        borderWidth: 1
    },
    passwordInput: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D3D3D3',
        padding: 2,
    },
    iconContainer: {
        padding: 8,
    },
});

export default MasterPassword;
