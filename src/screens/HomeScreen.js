// src/screens/HomeScreen.js

import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {API_BASE_URL} from "../constants";
import {styleAttributes} from "../styles";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {getToken, updateToken} from '../redux/slice';
import {logout} from "../redux/slice.js";

const HomeScreen = () => {
    const [content, setContent] = React.useState("");
    const navigation = useNavigation();
    const contentUrl = 'https://api.example.com/user/content';
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    useEffect(() => {

        axios.get(`${API_BASE_URL}/homeContent`,{headers: { Authorization:`Bearer ${token}` }})
            .then(response => {
                setContent(response.data.message);
            }).catch(error => {
            console.error('API call failed:', error);
            setContent("Failed to load content. "+error);
        }, [token]);

    }, []);

    const handleLogout = async () => {
        dispatch(logout());
        navigation.navigate("Login");
    };

    return (
        <View style={styleAttributes.homeContainer}>
            <Text style={styleAttributes.title}>Welcome!</Text>
            <Text style={styleAttributes.subtitle}>You are successfully logged in.</Text>

            <View style={styleAttributes.contentBox}>
                <Text style={styleAttributes.contentText}>
                    This is your main application area.
                    Content displayed here is secure and requires authentication.
                    {content}
                </Text>
                {/* Placeholder for fetching and displaying user-specific data */}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={styleAttributes.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styleAttributes.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;