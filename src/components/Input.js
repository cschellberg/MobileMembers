// src/components/Input.js

import React, { forwardRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Platform // Used for platform-specific adjustments if needed
} from 'react-native';

/**
 * A reusable, styled TextInput component.
 * * @param {object} props - Component properties.
 * @param {string} props.label - Optional label displayed above the input.
 * @param {string} props.errorText - Optional error message displayed below the input.
 * @param {object} props.style - Optional custom styles for the input container.
 * @param {object} props.inputStyle - Optional custom styles for the TextInput itself.
 * @param {string} props.placeholder - Placeholder text for the input.
 * @param {boolean} props.secureTextEntry - If true, hides the input text (for passwords).
 * @param {string} props.keyboardType - Specifies the type of keyboard to display.
 * @param {string} props.autoCapitalize - Controls capitalization behavior.
 * @param {function} props.onChangeText - Callback function when text changes.
 * @param {string} props.value - The current value of the input.
 * @param {object} ref - Ref forwarded from parent component to access the native TextInput.
 */
const Input = forwardRef((props, ref) => {
    const {
        label,
        errorText,
        style,
        inputStyle,
        ...restProps
    } = props;

    return (
        <View style={[styles.container, style]}>
            {/* Optional Label */}
            {label && <Text style={styles.label}>{label}</Text>}

            {/* The Core TextInput */}
            <TextInput
                ref={ref}
                style={[styles.input, inputStyle, errorText && styles.inputError]}
                placeholderTextColor="#999"
                {...restProps} // Spread any other standard TextInput props (value, onChangeText, secureTextEntry, etc.)
            />

            {/* Optional Error Message */}
            {errorText && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    );
});

// --- Basic Styling ---
const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        // Shadow for Android
        elevation: 1,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    inputError: {
        borderColor: '#FF3B30', // Red border when there's an error
        borderWidth: 2,
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        marginTop: 5,
        marginLeft: 5,
    },
});

export default Input;