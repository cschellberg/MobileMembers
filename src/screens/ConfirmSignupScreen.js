

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

const ConfirmSignupScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the request to send a password reset link/code.
     */
    const handleConfirmSignup = async () => {
        // 1. Basic Client-Side Validation
        if (!username.trim() || !confirmationCode.trim()) {
            Alert.alert('Error', 'Please enter your username and confirmation code.');
            return;
        }

        setIsLoading(true);

        try {
            // 2. REST API Call to Backend Reset Endpoint
            // This endpoint tells the server to initiate the reset process (e.g., sending an email)
            const response = await axios.post(`${API_BASE_URL}/confirmSignup`, {
                username: username.trim(),
                confirmationCode:confirmationCode.trim()
            });

            // 3. Handle Successful Response (HTTP 200 OK)
            // NOTE: It's a common security practice to return a success message
            // regardless of whether the user exists, to prevent enumeration attacks.
            Alert.alert(
                'Success',
                'Account has been confirmed successfully.',
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
                console.error("Confirm signup API error:", error.response.data);
            }

            // Even if the API returns an error, we display the success message
            // to the user and navigate them back, as the backend *should* handle
            // the security aspect. However, for debugging/transparency, we'll
            // show a network/critical error if the API request itself fails entirely.
            if (!error.response) {
                Alert.alert('Signup confirmation failed', errorMessage);
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styleAttributes.container}>
            <Text style={styleAttributes.title}>Confirm Signup</Text>
            <Text style={styleAttributes.subtitle}>
                Enter your email or username below and we'll send you a link to reset your password.
            </Text>

            {/* Email or Username Input */}
            <TextInput
                style={styleAttributes.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address" // Hint for common input type
            />

            <TextInput
                style={styleAttributes.input}
                placeholder="Confirmation Code"
                placeholderTextColor="#999"
                value={confirmationCode}
                onChangeText={setConfirmationCode}
                autoCapitalize="none"
                keyboardType="email-address" // Hint for common input type
            />

            {/* Reset Button */}
            <TouchableOpacity
                style={styleAttributes.button}
                onPress={handleConfirmSignup}
                disabled={isLoading}
            >
                <Text style={styleAttributes.buttonText}>
                    {isLoading ? 'Confirming...' : 'Confirm Signup'}
                </Text>
            </TouchableOpacity>

            {/* Back to Login Link */}
            <TouchableOpacity
                style={styleAttributes.backLink}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styleAttributes.backLinkText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};


export default ConfirmSignupScreen;