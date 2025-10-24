// src/components/Button.js

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';

/**
 * A reusable, styled Button component.
 * * @param {object} props - Component properties.
 * @param {string} props.title - The text displayed inside the button.
 * @param {function} props.onPress - The function executed when the button is pressed.
 * @param {boolean} props.disabled - If true, prevents interaction and applies disabled styling.
 * @param {boolean} props.isLoading - If true, shows a loading spinner and disables the button.
 * @param {object} props.style - Optional custom styles for the button container.
 * @param {object} props.textStyle - Optional custom styles for the button text.
 * @param {string} props.color - Custom background color for the button (overrides default).
 */
const Button = ({
                    title,
                    onPress,
                    disabled = false,
                    isLoading = false,
                    style,
                    textStyle,
                    color
                }) => {

    const buttonOpacity = disabled || isLoading ? 0.6 : 1;
    const buttonBackgroundColor = color || styles.button.backgroundColor;
    const spinnerColor = '#fff'; // Assuming white text/spinner for visibility

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: buttonBackgroundColor, opacity: buttonOpacity },
                style,
            ]}
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.7} // Press effect opacity
        >
            {isLoading ? (
                <ActivityIndicator color={spinnerColor} />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

// --- Default Styling ---
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF', // Default blue color
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50, // Ensure consistent height even with spinner
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Button;