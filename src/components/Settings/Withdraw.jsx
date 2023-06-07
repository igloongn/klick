import React,{useState} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, TextInput,Alert} from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetLogginedUser } from '../../utils/apiHooks';


const Withdraw = () => {
    const [amount, setAmount] = useState('');
    const [bankCode, setBankCode] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [change, setChange] = useState('');
    const { user, Loading, isErorr, getUserData } = useGetLogginedUser()



      const withdraw = async () => {
        setIsLoading(true)
        try {
          const token = await AsyncStorage.getItem('token');
          console.log('tok', token)
          const userData = await getUserData()
          console.log('data',typeof userData)
          // const url = `https://klick-api.onrender.com/product/?category=${selectCatId}`
          const response = await fetch('https://klick-api.onrender.com/wallet/payout', {
            method: "POST",
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
  
              amount,
              bankCode,
              accountNumber
             
  
  
          })
        })
          if(response?.status >= 200 && response?.status < 203 ){
            const _data = await response.json();
            console.log('y', _data)
            Alert.alert('Success', 'Top up added successfully');
            navigation.navigate('wallet')
          } else{
            throw Error('')
          }
         
          
    
        } catch (error) {
          // Handle network or other errors
          console.error(error);
          Alert.alert('Error', 'An error occured ');
        } finally {
          setIsLoading(false)
        }
        
      };
    
  return (
    <View style={styles.container}>
        <Text style={{textAlign:"center",fontSize:18,color:"#0B0B0E"}}>How much do you want to Withdraw?</Text>
        <View style={{paddingTop:30}}>
        <TextInput
        style={styles.input}
        onChangeText={text => setAmount(text)}
        value={amount}
        placeholder="e.g N10000"
      />
     
      </View>
       <Text style={{textAlign:"center",fontSize:18,color:"#0B0B0E",paddingTop:20}}>Total Available Balance - N0.0</Text>
       <View style={{marginLeft:-30}}>
       <GeneralInput name={'bank code'} placeholder={'e.g 044'} width={335} value={bankCode} onChangeValue={(text) => setBankCode(text)}/>
       <GeneralInput name={'account number'} placeholder={'e.g 0690000033'} width={335} value={accountNumber} onChangeValue={(text) => setAccountNumber(text)} />
       </View>

       <TouchableOpacity onPress={() => withdraw()} style={{paddingTop:30}}>
      <GeneralButton  message={'Continue'} color={change ? '#191600' : '#98999A'  } marginLeft={130} top={15} backgroundColor={change ? '#FEDD00' : '#F7F7F7'} borderColor={'#F7F7F7'} height={54} width={335}/>
       </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        // paddingLeft: 30,
        //   alignItems: 'center',
        //   justifyContent: 'center',
        alignItems:"center",
        paddingTop:30

    },
    input: {
        width: 335,
        height: 100,
        borderWidth: 2,
        borderColor: '#FEDD00',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius:10,
        fontSize:30,
      },

})

export default Withdraw