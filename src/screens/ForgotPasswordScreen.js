// src/screens/ForgotPasswordScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {API_BASE_URL} from "../constants";
import {styleAttributes} from "../styles";

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the request to send a password reset link/code.
     */
    const handlePasswordReset = async () => {
        // 1. Basic Client-Side Validation
        if (!emailOrUsername.trim()) {
            Alert.alert('Error', 'Please enter your email or username.');
            return;
        }

        setIsLoading(true);

        try {
            // 2. REST API Call to Backend Reset Endpoint
            // This endpoint tells the server to initiate the reset process (e.g., sending an email)
            const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
                identifier: emailOrUsername.trim(), // Use a generic identifier field
            });

            // 3. Handle Successful Response (HTTP 200 OK)
            // NOTE: It's a common security practice to return a success message
            // regardless of whether the user exists, to prevent enumeration attacks.
            Alert.alert(
                'Success',
                'If an account associated with this email or username exists, a password reset link has been sent.',
                [
                    // Navigate back to Login screen after the user acknowledges
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]
            );

        } catch (error) {
            // 4. Handle Errors (e.g., Network Error)
            // We generally avoid giving specific "user not found" errors here for security.
            let errorMessage = 'Could not process request. Please check your connection.';

            if (error.response) {
                // Log the error but display a generic success message to the user for security
                console.error("Forgot password API error:", error.response.data);
            }

            // Even if the API returns an error, we display the success message
            // to the user and navigate them back, as the backend *should* handle
            // the security aspect. However, for debugging/transparency, we'll
            // show a network/critical error if the API request itself fails entirely.
            if (!error.response) {
                Alert.alert('Request Failed', errorMessage);
            } else {
                // Display generic message on expected API errors for security
                Alert.alert(
                    'Success',
                    'If an account associated with this email or username exists, a password reset link has been sent.',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('Login') }
                    ]
                );
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Your Password?</Text>
            <Text style={styles.subtitle}>
                Enter your email or username below and we'll send you a link to reset your password.
            </Text>

            {/* Email or Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Email or Username"
                placeholderTextColor="#999"
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                autoCapitalize="none"
                keyboardType="email-address" // Hint for common input type
            />

            {/* Reset Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={handlePasswordReset}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Text>
            </TouchableOpacity>

            {/* Back to Login Link */}
            <TouchableOpacity
                style={styles.backLink}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.backLinkText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- Basic Styling ---
const styles = StyleSheet.create({
    container: styleAttributes.loginContainer,
    title: styleAttributes.title,
    subtitle: styleAttributes.subtitle,
    input: styleAttributes.input,
    button: styleAttributes.button,
    buttonText: styleAttributes.buttonText,
    backLink: styleAttributes. backLink,
    backLinkText: styleAttributes. backLinkText,
});

export default ForgotPasswordScreen;