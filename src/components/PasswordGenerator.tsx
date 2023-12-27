import { View, Text, ScrollView, SafeAreaView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/Feather'

import * as Yup from 'yup'

import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import Slider from '@react-native-community/slider';

const passwordSchema = Yup.object().shape({
    passwordLength: Yup.number()
        .min(8, 'Should be min of 8 characters')
        .max(20, 'Should be max of 20 characters')
        .required('Length is required')
})

export default function PasswordGenerator({navigation}: any) {
    
    const [passwordLength, setPasswordLength] = useState(8);
    const [password, setPassword] = useState('')
    const [isPasswordGenarated, setIsPasswordGenarated] = useState(false)

    const [lowerCase, setLowerCase] = useState(true)
    const [upperCase, setUpperCase] = useState(false)
    const [numbers, setNumbers] = useState(false)
    const [symbols, setSymbols] = useState(false)

    useEffect(() => {
        generatedPaswordString(Number(passwordLength));
    }, [lowerCase, upperCase, numbers, passwordLength,symbols]);


    const generatedPaswordString = (passwordLength: number) => {

        // const validatedLength = Yup.number()
        //     .min(8, 'Should be min of 4 characters')
        //     .max(20, 'Should be max of 16 characters')
        //     .required('Length is required')
        //     .validateSync(passwordLength);


        let characterList = '';

        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const digitChars = '0123456789'
        const spacialChars = '!@#$%&*()_{}+-'

        if (lowerCase) {
            characterList += lowerCaseChars
        }
        if (upperCase) {
            characterList += upperCaseChars
        }
        if (numbers) {
            characterList += digitChars
        }
        if (symbols) {
            characterList += spacialChars
        }



        const passwordResult = createPassword(characterList, passwordLength)
        setPassword(passwordResult)
        setIsPasswordGenarated(true)

    }


    const createPassword = (characters: string, passwordLength: number) => {
        let result = '';
        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.round(Math.random() * characters.length)
            result += characters.charAt(characterIndex)
        }

        return result;

        //   const charactersLength = characters.length;
        //   let result = '';

        //   // Ensure at least one character from each selected set
        //   const randomLower = getRandomCharacter('abcdefghijklmnopqrstuvwxyz');
        //   const randomUpper = getRandomCharacter('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        //   const randomDigit = getRandomCharacter('0123456789');
        //   const randomSpecial = getRandomCharacter('!@#$%&*()_{}+-');

        //   // Add the guaranteed characters to the result
        //   result += randomLower + randomUpper + randomDigit + randomSpecial;

        //   // Generate the remaining characters for the password
        //   for (let i = 0; i < passwordLength - 4; i++) {
        //     const characterIndex = Math.floor(Math.random() * charactersLength);
        //     result += characters.charAt(characterIndex);
        //   }

        //   // Shuffle the characters to randomize the order
        //   result = shuffleString(result);

        //   return result;
        // };

        // const getRandomCharacter = (characters: string) => {
        //   return characters.charAt(Math.floor(Math.random() * characters.length));
        // };

        // const shuffleString = (str: string) => {
        //   const arr = str.split('');
        //   for (let i = arr.length - 1; i > 0; i--) {
        //     const j = Math.floor(Math.random() * (i + 1));
        //     [arr[i], arr[j]] = [arr[j], arr[i]];
        //   }
        //   return arr.join('');

    }

    const resetPasswordState = () => {
        setPassword('')
        setIsPasswordGenarated(false)
        setLowerCase(true)
        setUpperCase(false)
        setNumbers(false)
        setSymbols(false)
    }


    const copyToClipboard = () => {
        Clipboard.setString(password);
        Snackbar.show({
            text: 'Password copied to clipboard',
            duration: Snackbar.LENGTH_SHORT
        });
    };

    return (
        <ScrollView keyboardShouldPersistTaps='handled' >
            <SafeAreaView style={styles.appContainer}>
                <View style={styles.formContainer}>
                    {/* <Text style={styles.title}>Password Generator</Text> */}
                    {isPasswordGenarated ? (
                        <View style={[styles.card, styles.cardElevated]}>
                            {/* <Text style={styles.subTitle}>Result:</Text> */}
                            {/* <Text style={styles.description}>Long Press to copy</Text> */}
                            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
                            <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                                {/* <Text style={styles.copyButtonText}>Copy</Text> */}
                                <Icon name='copy' size={24} color='black' />
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <Text style={{ color: 'grey', margin: 4, fontSize: 20, marginBottom: 15 }}>Options</Text>
                    <Formik
                        initialValues={{ passwordLength: '' }}
                        validationSchema={passwordSchema}
                        onSubmit={values => {
                            const length = Number(values.passwordLength); // Extract the length from form values
                            setPasswordLength(length);
                            generatedPaswordString(Number(values.passwordLength))
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            isValid,
                            handleChange,
                            handleSubmit,
                            handleReset,
                            /* and other goodies */
                        }) => (
                            <>
                                <View style={styles.optionContainer}>
                                    {/* <View style={styles.inputWrapper}> */}
                                    {/* <View style={styles.inputColum}>
                                            <Text style={styles.heading}>Password Length</Text>
                                            {touched.passwordLength && errors.passwordLength && (
                                                <Text style={styles.errorText}>
                                                    {errors.passwordLength}
                                                </Text>
                                            )}
                                        </View> */}
                                    {/* <TextInput
                                            style={styles.inputStyle}
                                            value={values.passwordLength}
                                            onChangeText={handleChange('passwordLength')}
                                            placeholder='Ex.9'
                                            placeholderTextColor='black'
                                            keyboardType='numeric'
                                        /> */}

                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputColum}>
                                            <Text style={styles.heading}>Length: {values.passwordLength}</Text>
                                            {touched.passwordLength && errors.passwordLength && (
                                                <Text style={styles.errorText}>
                                                    {errors.passwordLength}
                                                </Text>
                                            )}
                                        </View>
                                        <Slider
                                            style={{ width: '100%', height: 40 }}
                                            minimumValue={8}
                                            maximumValue={20}
                                            minimumTrackTintColor="#6200EE" // Change the color of the track on the left side of the thumb
                                            maximumTrackTintColor="#000000" // Change the color of the track on the right side of the thumb
                                            thumbTintColor="#6200EE" // Change the color of the thumb
                                            step={1}
                                            value={Number(values.passwordLength)}
                                            onValueChange={(val) => {
                                                handleChange('passwordLength')(String(val))
                                                const length = Number(values.passwordLength); // Extract the length from form values
                                                setPasswordLength(length);
                                            }}
                                        />
                                    </View>
                                    {/* </View> */}
                                    <View style={styles.inputWrapper1}>
                                        <Text style={styles.heading}>Lowercase Letters</Text>
                                        <BouncyCheckbox
                                            disableBuiltInState
                                            isChecked={lowerCase}
                                            onPress={() => setLowerCase(!lowerCase)}
                                            fillColor="#29AB87"
                                        />
                                    </View>
                                    <View style={styles.inputWrapper1}>
                                        <Text style={styles.heading}>UpperCase Letters</Text>
                                        <BouncyCheckbox
                                            disableBuiltInState
                                            isChecked={upperCase}
                                            onPress={() => setUpperCase(!upperCase)}
                                            fillColor="#FED85D"
                                        />
                                    </View>
                                    <View style={styles.inputWrapper1}>
                                        <Text style={styles.heading}>Digits</Text>
                                        <BouncyCheckbox
                                            disableBuiltInState
                                            isChecked={numbers}
                                            onPress={() => setNumbers(!numbers)}
                                            fillColor="#C9A0DC"
                                        />
                                    </View>
                                    <View style={styles.inputWrapper1}>
                                        <Text style={styles.heading}>Spacial Characters</Text>
                                        <BouncyCheckbox
                                            disableBuiltInState
                                            isChecked={symbols}
                                            onPress={() => setSymbols(!symbols)}
                                            fillColor="#FC80A5"
                                        />
                                    </View>
                                    <View style={styles.formActions}>
                                        <TouchableOpacity
                                            disabled={!isValid}
                                            style={styles.primaryBtn}
                                            onPress={() => {handleSubmit(); navigation.navigate('Test', {GeneratedPassword:password}) }}
                                        
                                        >
                                            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.secondaryBtn}
                                            onPress={() => {
                                                handleReset();
                                                resetPasswordState()
                                            }}
                                        >
                                            <Text style={styles.secondaryBtnTxt}>Reset</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    formContainer: {
        margin: 8,
        padding: 8
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 25,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'black'
    },
    heading: {
        fontSize: 18,
        color: 'black'
    },
    optionContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    copyButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputWrapper: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        // borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D3D3D3',
        padding: 3,
    },
    inputWrapper1: {
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#D3D3D3',
        padding: 9,
    },
    inputColum: {
        flexDirection: 'column'
    },
    inputStyle: {
        paddingVertical: 2,
        marginVertical: 6,
        marginHorizontal: 6,
        padding: 6,
        width: '25%',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#16213e',
        color: 'black'
    },
    errorText: {
        fontSize: 12,
        color: '#ff0d10'
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    primaryBtn: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#6200EE',
    },
    primaryBtnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
    },
    secondaryBtn: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#F4511E',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    secondaryBtnTxt: {
        textAlign: 'center',
        color: 'white'
    },
    subTitle: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 2,
    },
    description: {
        color: '#758283',
        marginBottom: 8,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        padding: 11,
        borderRadius: 6,
        marginHorizontal: 11,
        marginVertical: 11,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardElevated: {
        backgroundColor: '#ffffff',
        elevation: 1,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    generatedPassword: {
        fontSize: 22,
        textAlign: 'center',
        left: 12,
        color: '#000'
    },
})
