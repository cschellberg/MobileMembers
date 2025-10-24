// App.js

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// --- Import Your Screen Components ---
// You will create these files separately
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen'; // Screen after successful login

// --- Navigation Stacks ---
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

/**
 * Renders the screens accessible before a user is logged in (Login, Register, Forgot Password).
 */
const AuthNavigator = () => (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false, // Hides the header for a cleaner look
        }}
    >
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
);

/**
 * Renders the screens accessible after a user is logged in (Home, etc.).
 */
const AppNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome!' }}
        />
        {/* Add other protected screens here (e.g., Profile, Settings) */}
    </AppStack.Navigator>
);


/**
 * Main application component responsible for the navigation and auth flow.
 */
const App = () => {
    // In a real app, this state would come from a global context (e.g., Redux)
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null); // null means not logged in

    // --- Mock Authentication Check ---
    // In a real app, this effect would:
    // 1. Check AsyncStorage for a saved user token.
    // 2. Validate the token with the backend.
    useEffect(() => {
        const bootstrapAsync = async () => {
            let retrievedUserToken = null;
            try {
                // Example: retrieve token from secure storage
                // retrievedUserToken = await AsyncStorage.getItem('userToken');
                // If a token is found, set it:
                // setUserToken(retrievedUserToken);
            } catch (e) {
                // Handle token retrieval errors
            }

            setIsLoading(false);
        };

        bootstrapAsync();
    }, []);
    // --- End Mock Authentication Check ---

    // Show a loading screen while checking for the user token
    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {/* Conditionally renders the appropriate stack based on authentication status */}
            {userToken ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;