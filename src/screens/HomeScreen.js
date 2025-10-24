// src/screens/HomeScreen.js

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
// If you are using AsyncStorage for token removal, import it here:
// import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    // NOTE: This component does not use `useNavigation()` to navigate
    // because navigating from HomeScreen should typically trigger a state
    // change in App.js (e.g., setting userToken to null), which then
    // automatically switches back to the AuthNavigator stack.

    /**
     * Handles the logout process by clearing the stored user token.
     */
    const handleLogout = async () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: async () => {
                        try {
                            // 1. Clear the stored authentication token
                            // await AsyncStorage.removeItem('userToken');

                            // 2. IMPORTANT: In a real app, you would use a Context/Redux
                            // dispatch function here (e.g., `signOut()`) to update the
                            // global state that App.js is watching. Setting this state
                            // to null will cause App.js to switch back to the Login screen.

                            Alert.alert('Logged Out', 'You have been successfully logged out.');

                            // Since we don't have the global context here, this is the end of the line.
                            // Assume the state update will happen here and the screen will unmount.

                        } catch (e) {
                            Alert.alert('Error', 'Failed to log out.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>You are successfully logged in.</Text>

            <View style={styles.contentBox}>
                <Text style={styles.contentText}>
                    This is your main application area.
                    Content displayed here is secure and requires authentication.
                </Text>
                {/* Placeholder for fetching and displaying user-specific data */}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- Basic Styling ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    contentBox: {
        backgroundColor: '#F0F8FF',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        width: '100%',
        marginBottom: 50,
        alignItems: 'center',
    },
    contentText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#FF3B30', // Red for destructive actions like logout
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;