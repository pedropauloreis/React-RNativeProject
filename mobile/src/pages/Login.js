import React, {useState, useEffect} from 'react';
import {View, KeyboardAvoidingView, Platform, Image, StyleSheet , Text, TextInput, TouchableOpacity} from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api'

import logo from '../assets/logo.png';



export default function Login({navigation}){

    const[email,setEmail] = useState('');
    const[techs,setTechs] = useState('');
    const [isSelected, setSelection] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if (user){
                navigation.navigate('List');
            }
        })
    },[])

    async function handleSubmit(){
        //email, techs
        
        const response = await api.post('/sessions',{
            email
        })

        const{_id} = response.data;
        await AsyncStorage.setItem('user',_id);
        await AsyncStorage.setItem('techs',techs);

        navigation.navigate('List');

    };

    const userList = {
        "123":"Tom",
        "124":"Michael",
        "125":"Christin"
      }

    return <KeyboardAvoidingView enabled={Platform.OS =='ios'} behavior='padding' style={styles.container}>
        <Image source={logo} />
        <View style={styles.form}>
            <Text style={styles.label} >SEU EMAIL *</Text>
            <TextInput 
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor= "#999"
            keyboardType="email-address"
            autoCapitalize = "none"
            autoCorrect={false}
            value={email}
            // onChangeText={text => setEmail(text)}
            onChangeText={setEmail}
             />
        

        <Text style={styles.label} >TECNOLOGIAS *</Text>
            <TextInput 
            style={styles.input}
            placeholder="Tecnologias de interesse"
            placeholderTextColor= "#999"
            autoCapitalize = "words"
            autoCorrect={false}
            value={techs}
            // onChangeText={text => setEmail(text)}
            onChangeText={setTechs}
             />

        <Text style={styles.label} >TECNOLOGIAS *</Text>
        <CustomMultiPicker
                options={userList}
                search={true} // should show search bar?
                multiple={true} //
                placeholder={"Search"}
                placeholderTextColor={'#757575'}
                returnValue={"label"} // label or value
                callback={(res)=>{ console.log(res) }} // callback, array of selected items
                rowBackgroundColor={"#eee"}
                rowHeight={40}
                rowRadius={5}
                searchIconName="ios-checkmark"
                searchIconColor="red"
                searchIconSize={30}
                iconColor={"#00a2dd"}
                iconSize={30}
                selectedIconName={"ios-checkmark-circle-outline"}
                unselectedIconName={"ios-radio-button-off-outline"}
                scrollViewHeight={130}
                selected={["Tom", "Christin"]} // list of options which are selected by default
                />


        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
    </View>

      
    </KeyboardAvoidingView>
}



const styles =   StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,

    },

    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:2,
    },

    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },



    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    }
});
