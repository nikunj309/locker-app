import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Snackbar from 'react-native-snackbar';
import AppwriteContext from '../appwrite/AppwriteContext';

import Icon from 'react-native-vector-icons/Ionicons'
import IconRetweet from 'react-native-vector-icons/AntDesign'
import { RouteProp, useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface FormData {
    itemName: string;
    userName: string;
    password: string;
    website: string;
}

interface FormErrors {
    itemName?: string;
    userName?: string;
    password?: string;
    website?: string;
}

type RootStackParamList = {
    Home: undefined;
    PasswordCreate: {
        postDetails?: {
            $id: string;
            itemName: string;
            userName: string;
            password: string;
            website: string;
        };
        DetailsNotEditable?: boolean;
        GeneratedPassword?: string;
    };
    // Add other screens if needed
};


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type PasswordCreateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PasswordCreate'>;



interface HomeScreen {
    navigation: HomeScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Home'>; // Replace 'Home' with your actual screen name
}
interface PasswordGenerator {
    navigation: PasswordCreateScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'PasswordCreate'>; // Replace 'Home' with your actual screen name
}


type Props = HomeScreen | PasswordGenerator;



// React.FC<{ route: { params?: RouteParams } }> = ({ route })

const PasswordCreateScreen: React.FC<Props> = ({ route }) => {
    const { postDetails, DetailsNotEditable, GeneratedPassword } = route.params ?? {};


    const [showPassword, setShowPassword] = useState(false);
    const [isEditMode, setIsEditMode] = useState(!DetailsNotEditable);
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()

    const { appwrite } = useContext(AppwriteContext);


    const [formData, setFormData] = useState<FormData>({
        itemName: postDetails?.itemName || '',
        userName: postDetails?.userName || '',
        password: postDetails?.password || '',
        website: postDetails?.website || '',
    });


    const [formErrors, setFormErrors] = useState<FormErrors>({
        itemName: '',
        userName: '',
        password: '',
        website: '',
    });




    const handleSubmit = async () => {
        setIsLoading(true);
        console.log('Form values', formData);

        try {

            // let errors = {};
            let errors: { itemName?: string, userName?: string, password?: string, website?: string } = {};

            let formIsValid = true;

            // Validation for Item Name
            if (!formData.itemName) {
                errors.itemName = 'Item Name is required';
                formIsValid = false;
                setIsLoading(false);
            }

            // Validation for Username
            if (!formData.userName) {
                errors.userName = 'Username or Email is required';
                formIsValid = false;
                setIsLoading(false);
            }

            // Validation for Password
            if (!formData.password) {
                errors.password = 'Password is required';
                formIsValid = false;
                setIsLoading(false);
            }

            if (postDetails) {
                const updatedUserPasswordPost = await appwrite.UpdateUserPasswordPost(postDetails.$id, formData.itemName,
                    formData.userName,
                    formData.password,
                    formData.website,)

                setIsLoading(false)
                if (updatedUserPasswordPost) {
                    navigation.navigate('Home');
                }
            } else {
                if (formIsValid) {
                    console.log('Form data is valid:', formData);

                    const userInfo = await appwrite.account.get();
                    const userId = userInfo.$id;

                    const addUserPasswordData = await appwrite.addUserPassword(

                        formData.itemName,
                        formData.userName,
                        formData.password,
                        formData.website,
                        userId,
                    )

                    setIsLoading(false)
                    if (addUserPasswordData) {
                        console.log("succes  hurrre:: addes user password data");
                        navigation.navigate('Home')
                    }
                    else {
                        console.error('Error in add user password data');
                        setIsLoading(false)
                        Snackbar.show({
                            text: 'Error in add user password data',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                } else {
                    setFormErrors(errors);
                    setIsLoading(false)
                }

            }
        } catch (error) {
            console.error('Error in add password:', error);
            setIsLoading(false);
            Snackbar.show({
                text: 'Error in add password',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    return (
        <>
            {isLoading ? <Loading />
                :
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
                        {formErrors.itemName && <Text style={styles.error}>{formErrors.itemName}</Text>}
                    </View>

                    <Text style={styles.moreDetaileHeader}>Details</Text>

                    <View style={styles.detailsMainContainer}>
                        <View style={styles.detailsContainer}>
                            <TextInput
                                style={[styles.inputDetails, !isEditMode && styles.disabledInput]}
                                placeholder="Username or Email"
                                placeholderTextColor="grey"
                                onChangeText={(text) => setFormData({ ...formData, userName: text })}
                                value={formData.userName}
                                editable={isEditMode}
                            />
                            {formErrors.userName && <Text style={styles.error}>{formErrors.userName}</Text>}
                            <View style={[styles.passwordInput, !isEditMode && styles.disabledInput]}>
                                <TextInput
                                    style={[styles.passwordiNputField, !isEditMode && { color: "#7F8C8D" }]}
                                    secureTextEntry={!showPassword}
                                    placeholder="Password"
                                    placeholderTextColor="grey"
                                    onChangeText={(text) => {
                                        // if (GeneratedPassword) {
                                        //     setFormData({ ...formData, password: GeneratedPassword })
                                        // } else {
                                            // setFormData({ ...formData, password: GeneratedPassword ? GeneratedPassword : text })
                                        // }

                                        if (GeneratedPassword && GeneratedPassword.trim() !== '') {
                                            setFormData({ ...formData, password: GeneratedPassword });
                                          } else {
                                            setFormData({ ...formData, password: text });
                                          }
                                    }}
                                    value={formData.password || GeneratedPassword}
                                    editable={isEditMode}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainer}>
                                    {showPassword ? <Icon name='eye-off-outline' size={24} color='black' /> : <Icon name='eye-outline' size={24} color='black' />}
                                </TouchableOpacity>
                            </View>
                            {formErrors.password && <Text style={styles.error}>{formErrors.password}</Text>}
                            <TouchableOpacity style={{ margin: 5 }} onPress={() => navigation.navigate('PasswordGenerator')}>
                                <View style={styles.passwordGenerateContainer}>
                                    <View style={styles.passwordGenerateContainerLeftPart}>
                                        <IconRetweet name='retweet' size={24} color='#F06292' />
                                        <Text style={{ color: '#5B2C6F', fontSize: 15 }}>Generate</Text>
                                    </View>
                                    <View style={styles.passwordGenerateContainerRighPart}>
                                        <IconRetweet name='rightcircleo' size={24} color='black' />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                style={[styles.inputDetails, !isEditMode && styles.disabledInput]}
                                placeholder="Website"
                                placeholderTextColor="grey"
                                onChangeText={(text) => setFormData({ ...formData, website: text })}
                                value={formData.website}
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
            }

        </>
    );
};


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
export default PasswordCreateScreen;
