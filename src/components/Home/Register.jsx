import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from "../../settings"

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)



    // const navigate = useNavigation()

    const registerUser = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL + "/auth/signup", {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    phone,

                })
            });
            const res_status_code = response.status;
            const res_data = await response.json();

            if (res_status_code != 201) {
                throw new Error(res_data.message);
            }

            // Store the authentication token in AsyncStorage
            await AsyncStorage.setItem('token', res_data.access_token);
        
            Alert.alert('Registeration succesful', 'Registeration was successful', [
                { text: 'OK', onPress: () => navigation.navigate('verify') },
            ])
            navigation.navigate('verify')
        } catch (error) {
            // Handle network or other errors
            console.log(error);
            Alert.alert('Error', 'An error occured during login.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={{ fontWeight: "500", fontSize: 24, color: "#0B0B0E", marginLeft: 100 }}>Create your Klick Account</Text>
                <Text style={{ fontWeight: "400", fontSize: 14, color: "#6A6B6C", marginLeft: 70 }}>Register an account so you can start selling on Klick.</Text>
                <GeneralInput placeholder={'John'} name="firstName" width={335} value={firstName} onChangeValue={text => setFirstName(text)} />
                <GeneralInput placeholder={'Doe'} name="lastName" width={335} value={lastName} onChangeValue={text => setLastName(text)} />
                <GeneralInput placeholder={'johndoe@gmail.com'} name="Email" width={335} value={email} onChangeValue={text => setEmail(text)} />
                <GeneralInput placeholder={'e.g +2349062056518 (preferably whatsapp no.)'} name="phone" width={335} value={phone} onChangeValue={text => setPhone(text)} />
                <GeneralInput name="Password" width={335} value={password} onChangeValue={text => setPassword(text)} />
                <TouchableOpacity onPress={() => registerUser()}>
                    <GeneralButton backgroundColor={'#FEDD00'} message={(loading ? 'Loading .....' : 'Continue')} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} />
                </TouchableOpacity>
                {loading && <ActivityIndicator size="large" />}


                <Text style={{ fontWeight: "500", fontSize: 20, color: "#0B0B0E", marginLeft: 60, marginTop: 15 }}>Don't have an account yet? </Text>
                <Pressable onPress={() => navigation.navigate('login')}><Text style={{ fontWeight: "500", fontSize: 20, color: "blue", marginLeft: 260, marginTop: -22 }}>Log in</Text></Pressable>

                <View style={{ marginTop: 50 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        // alignItems: 'center',
        justifyContent: 'center',
    },

})

export default Register;