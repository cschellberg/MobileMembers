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
import axios from 'axios';
import {API_BASE_URL} from "../constants";
import {styleAttributes} from "../styles";
import { useDispatch } from 'react-redux';
import {updateToken} from "../redux/slice.js";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

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
                email: username.trim(),
                password: password.trim(),
            });

            // 3. Handle Successful Response (HTTP 200 OK)
            const { token } = response.data;

            if (token) {
                dispatch(updateToken(token));
                navigation.navigate('Home')
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
        <View style={styleAttributes.container}>
            <Text style={styleAttributes.title}>Welcome Back</Text>

            {/* Username Input */}
            <TextInput
                style={styleAttributes.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
                style={styleAttributes.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true} // IMPORTANT for password security
                autoCapitalize="none"
            />

            {/* Login Button */}
            <TouchableOpacity
                style={styleAttributes.button}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={styleAttributes.buttonText}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                </Text>
            </TouchableOpacity>
            <View style={styleAttributes.linkContainer}>
            <TouchableOpacity style={styleAttributes.link}
                onPress={() => navigation.navigate('ConfirmSignup')}
            >
                <Text style={styleAttributes.linkText}>Confirm Registration</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleAttributes.link}
                onPress={() => navigation.navigate('ResetPassword')}
            >
                <Text style={styleAttributes.linkText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styleAttributes.link}
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                <Text style={styleAttributes.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
            </View>
            {/* Registration Link */}
            <View style={styleAttributes.footer}>
                <Text style={styleAttributes.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styleAttributes.registerLink}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default LoginScreen;