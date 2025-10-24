// src/screens/LoginScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert // Used for displaying success/error messages
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// If you are using AsyncStorage for token storage, import it here:
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE_URL} from "../constants";
import {styleAttributes} from "../styles";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the login process by sending user credentials to the backend.
     */
    const handleLogin = async () => {
        // 1. Basic Client-Side Validation
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }

        setIsLoading(true);

        try {
            // 2. REST API Call to Backend Login Endpoint
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username: username.trim(),
                password: password.trim(),
            });

            // 3. Handle Successful Response (HTTP 200 OK)
            const { token } = response.data;

            if (token) {
                // 4. Securely Store the Authentication Token (e.g., JWT)
                // await AsyncStorage.setItem('userToken', token);

                // --- Mocking successful login and navigation to Home ---
                Alert.alert('Success', 'Login successful!');

                // In a real app, you would dispatch an action or set a context
                // state to update the 'userToken' state in App.js,
                // which triggers the navigation switch from AuthStack to AppStack.
                // For now, we'll navigate directly as a placeholder:
                // navigation.navigate('Home');

                // If App.js is handling the conditional rendering, you'll need a way
                // to update the state there (e.g., via Context API).
            }
        } catch (error) {
            // 5. Handle Errors (e.g., 401 Unauthorized, Network Error)
            let errorMessage = 'An unexpected error occurred. Please try again.';

            if (error.response) {
                // Server responded with a status code outside the 2xx range
                if (error.response.status === 401) {
                    errorMessage = 'Invalid username or password.';
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            } else if (error.request) {
                // The request was made but no response was received (e.g., network issue)
                errorMessage = `Network Error. Could not reach the server.${API_BASE_URL }`;
            }

            Alert.alert('Login Failed', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>

            {/* Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} // IMPORTANT for password security
                autoCapitalize="none"
            />

            {/* Login Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                </Text>
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Registration Link */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerLink}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Basic Styling ---
const styles = StyleSheet.create({
    container: styleAttributes.loginContainer ,
    title: styleAttributes.title,
    input: styleAttributes.input,
    button: styleAttributes.button,
    buttonText: styleAttributes.buttonText,
    link: styleAttributes.link,
    linkText: styleAttributes.linkText,
    footer: styleAttributes.footer,
    footerText: styleAttributes.footerText,
    registerLink: styleAttributes.registerLink,
});

export default LoginScreen;