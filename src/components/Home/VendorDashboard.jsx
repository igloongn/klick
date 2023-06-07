import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable,  } from "react-native"
import SHomeCubes from './SHomeCubes'
import SRecentOrders from './SRecentOrders'
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import axios from 'axios';
import { useBuyerSwitchVendorContext } from '../BuyerSwitchVendor';

import { useIsFocused } from "@react-navigation/native"; 

const getLoginData = async (navigation, alternative = ()=> null) => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn')
    //   console.log(value)
      if(value == null) {
        navigation.navigate("login")
      }else{
        alternative()
      }
    } catch(e) {
      // error reading value
    }
  }



const VendorDashboard = ({ navigation }) => {
    const [buysell, setBuySell] = useState(true);
    const mode_data = useBuyerSwitchVendorContext();
    const [store, setStore] = useState(null)
    const [user, setUser] = useState(null)
    // console.log(mode_data)
    const focused = useIsFocused()


    const getShopData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const userresponse = await fetch(`https://klick-api.onrender.com/auth/user`, {
                method: "GET",
                mode: 'no-cors',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
            })

            const userdata = await userresponse.text()
            setUser(userdata)
            console.log(userdata)
            // const response = await fetch(`https://klick-api.onrender.com/brand/${id}`, {
            //     method: "GET",
            //     mode: 'no-cors',
            //     headers: {
            //       
            //       'Authorization': `Bearer ${token}`
            //     },
            // })
            
          } catch(e) {
            console.log(e)
          }
    }


    if(mode_data?.mode === "buyer"){ 
      navigation.navigate({ name: "hometab"})
    }
    useEffect(() =>  {
        axios.get("https://klick-api.onrender.com/product/")
     .then(res => setData(res.data.data))
     .catch(err => console.log(res.err))
    //  .finally(item =>  setLoading(false))
     }, []);
     
     console.log('focused',focused)
    
     useEffect(()=>{
        getShopData();
        () => console.log('out')
     },[focused])


    // useEffect(()=>{
    //     // Add Login && Register logic here
    //     getLoginData(navigation);
    //     // console.log('here')
        
    // })
    return (
        <View style={styles.container}>
             
            <ScrollView>

            <View style={{display: "flex", flexDirection: "row", marginTop: 80}}>
           
            <Image style={{height:60,width:60,borderRadius:50}} source={require('../../../assets/orderpic.png')}></Image>
            <View>
                <Text style={{ color: "#0B0B0E", fontSize: 20, fontWeight: "500", marginLeft:10,marginTop:10}}></Text>
                <Text  style={{ color: "#98999A", fontSize: 12, fontWeight: "400", marginLeft: 10 }}>Yaba, Lagos</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("notifications")}>
                <AntDesign name="bells" size={24} color="black" style={{marginLeft:120}}/>
                </Pressable>
            </View>
                <View style={{ display: "flex", flexDirection: "row", marginTop: 140 }}>
                    <View style={{ marginLeft: 40 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("addnewproduct")} style={{ height: 52, width: 52, backgroundColor: "#0485E8", borderRadius: 50 }} />
                        <Text style={{ marginLeft: -10 }}>Add Product</Text>
                        <SimpleLineIcons name="handbag" size={24} color="white" style={{marginTop:-55,marginLeft:15}} />
                    </View>
                    <View style={{ marginLeft: 40 }}>
                        <TouchableOpacity onPress={()=>navigation.navigate('discounts')} style={{ height: 52, width: 52, backgroundColor: "#1BB519", borderRadius: 50 }}></TouchableOpacity>
                        <Text style={{ marginLeft: 0 }}>Run Sales</Text>
                        <Feather name="percent" size={24} color="white" style={{marginTop:-55,marginLeft:15}} />
                    </View>
                    <View style={{ marginLeft: 40 }}>
                        <View style={{ height: 52, width: 52, backgroundColor: "#EB270B", borderRadius: 50 }}></View>
                        <Text style={{ marginLeft: 3 }}>Support</Text>
                        <Octicons name="comment-discussion" size={24} color="white" style={{marginTop:-55,marginLeft:15}} />
                    </View>
                </View>


                <View style={{ display: "flex", flexDirection: "row", marginLeft: 0, marginTop: 60 }}>
                    <SHomeCubes name={"Income"} />
                    <SHomeCubes name={"Total Orders"} />
                </View>

                <View style={{ display: "flex", flexDirection: "row", marginLeft: 0, marginTop: 20 }}>
                    <SHomeCubes name={"Average sales"}/>
                    <SHomeCubes name={"Impressions"}/>
                </View>


                <Text style={{ color: "#98999A", fontSize: 12, fontWeight: "400", marginTop: 20 }}>Overall sales</Text>
                <View style={{ display: "flex", flexDirection: "row", marginLeft: 0, marginTop: 0 }}>
                    <Text style={{ color: "#0B0B0E", fontSize: 20, fontWeight: "500", marginTop: 0 }}>N2,768,058</Text>
                    <View onPress={(buysell) => setBuySell(!buysell)} style={{
                        height: 23, width: 58, borderRadius: 20, backgroundColor: "#FEDD00", position: "absolute", alignItems: 'center', marginTop: 0, marginLeft: 120,
                        justifyContent: 'center'
                    }}><Text style={{ fontSize: 11 }}>23.5%</Text></View>
                </View>





                <Text style={{ color: "#0B0B0E", fontSize: 20, fontWeight: "500", marginTop: 30 }}>Recent Orders</Text>
                <SRecentOrders />


                {/* <View style={{ marginTop: 1000 }}></View> */}
            </ScrollView>
                    <TouchableOpacity onPress={() =>{  
                        getLoginData(navigation , () => navigation.navigate("selleronboard")); 
                        
                    }} style={{
                height: 42, width: 120, borderRadius: 20, backgroundColor: "#FEDD00", position: "absolute", alignItems: 'center',
                justifyContent: 'center', top: 150, left: 0
            }}><Text style={{ fontSize: 11 }}>Create Store</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{ 
      
      mode_data?.switchMode('buyer')
    console.log('hello')
    }} style={{
                height: 42, width: 120, borderRadius: 20, backgroundColor: "#FEDD00", position: "absolute", alignItems: 'center',
                justifyContent: 'center', bottom: 10, right: 0
            }}><Text style={{ fontSize: 11 }}>Switch to Buyer</Text></TouchableOpacity>
            

            


        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        marginLeft: 20,
        //   alignItems: 'center',
        //   justifyContent: 'center',

    },

})


export default VendorDashboard