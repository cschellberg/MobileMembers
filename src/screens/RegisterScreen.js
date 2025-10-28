// src/screens/RegisterScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView, // Used to ensure the form is scrollable on small screens
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {API_BASE_URL} from "../constants";
import {styleAttributes} from "../styles";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Basic client-side validation for the form data.
     */
    const validateForm = () => {
        const { email,  username, password } = formData;

        if ( !email || !username || !password) {
            Alert.alert('Validation Error', 'All fields are required.');
            return false;
        }

        // Email format validation (simple regex)
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            Alert.alert('Validation Error', 'Username must be at least 6 characters long.');
            return false;
        }

        // Password strength check (e.g., minimum 6 characters)
        if (password.length < 6) {
            Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
            return false;
        }

        return true;
    };

    /**
     * Handles the registration process by sending user data to the backend.
     */
    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                username:formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password.trim()
            }
            // 1. REST API Call to Backend Registration Endpoint
            const response = await axios.put(`${API_BASE_URL}/register`, payload);

            // 2. Handle Successful Response (HTTP 201 Created or 200 OK)
            Alert.alert(
                'Success',
                'Registration successful! You can now log in.',
                [
                    // Automatically navigate back to the Login screen on success
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]
            );

        } catch (error) {
            // 3. Handle Errors (e.g., 400 Bad Request, Username/Email already exists)
            let errorMessage = 'An unexpected error occurred during registration. Please try again.';

            if (error.response) {
                // Server responded with an error (e.g., validation fail, user exists)
                if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.status === 409) { // Common code for conflict/duplicate
                    errorMessage = 'Username or email is already registered.';
                }
            } else if (error.request) {
                // Network Error
                errorMessage = 'Network Error. Could not reach the server.';
            }

            Alert.alert('Registration Failed', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styleAttributes.scrollContainer}>
            <View style={styleAttributes.container}>
                <Text style={styleAttributes.title}>Create Your Account</Text>


                <TextInput
                    style={styleAttributes.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />


                <TextInput
                    style={styleAttributes.input}
                    placeholder="Username"
                    placeholderTextColor="#999"
                    value={formData.username}
                    onChangeText={(text) => handleChange('username', text)}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styleAttributes.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry={true} // IMPORTANT for password security
                    autoCapitalize="none"
                />

                {/* Register Button */}
                <TouchableOpacity
                    style={styleAttributes.button}
                    onPress={handleRegister}
                    disabled={isLoading}
                >
                    <Text style={styleAttributes.buttonText}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </Text>
                </TouchableOpacity>

                {/* Back to Login Link */}
                <View style={styleAttributes.footer}>
                    <Text style={styleAttributes.footerText}>Already have an account? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styleAttributes.loginLink}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};



export default RegisterScreen;