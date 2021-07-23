import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import socketio from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotList from '../components/SpotList';
import LocalVars from '../config/localVars'
import logo from '../assets/logo.png';

export default function List({navigation}){
    const[techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio(`${LocalVars.backend.local}:${LocalVars.backend.port}`,{
                query: {user_id: user_id}
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company}  foi ${booking.approved? 'APROVADA':'REJEITADA'}`);
            })

        })
    },[])


    async function handleCancel(){
        await AsyncStorage.setItem('user','');
        await AsyncStorage.setItem('techs','');
        navigation.navigate('Login');
    }

    useEffect(() => {

            
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());
            setTechs(techsArray);
        })
    },[])
 
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
            {techs.map(tech=>(<SpotList key={tech} tech={tech} />))}
            </ScrollView>
            <TouchableOpacity onPress={handleCancel} style={[styles.button,styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    logo:{
        height:32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:2,
    },

    cancelButton:{
        backgroundColor: '#ccc',
        marginTop: 10,
    },


    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})