import {StyleSheet} from "react-native";

const styles =
    {
        scrollContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: '#f8f8f8',
        },
        container: {
            padding: 30,
        },
        loginContainer: {
            flex: 1,
            justifyContent: 'center',
            padding: 30,
            backgroundColor: '#f8f8f8',
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 30,
            textAlign: 'center',
            color: '#333',
        },
        input: {
            height: 50,
            borderColor: '#ddd',
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            fontSize: 16,
            color: '#333',
        },
        button: {
            backgroundColor: '#28A745', // Green for registration/success actions
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
        },
        footerText: {
            fontSize: 16,
            color: '#666',
        },
        link: {
            marginTop: 20,
            alignSelf: 'flex-end',
        },
        linkText: {
            color: '#007AFF',
            fontSize: 14,
            paddingRight: 20,
        },
        loginLink: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#007AFF', // Standard blue
        },
        registerLink: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#007AFF',
        },
        subtitle: {
            fontSize: 16,
            textAlign: 'center',
            color: '#666',
            marginBottom: 40,
        },
        backLink: {
            marginTop: 30,
            alignItems: 'center',
        },
        backLinkText: {
            color: '#007AFF',
            fontSize: 16,
            fontWeight: 'bold',
        },
        linkContainer: {
            flexDirection: 'row',        // Lays children out horizontally
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            alignItems: 'center',        // Vertically centers the items in the row
            width: '100%',               // Ensures the row takes up the full available width
            paddingHorizontal: 5,       // Add padding to the left/right of the row
            marginTop: 5,
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
        homeContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30,
            backgroundColor: '#fff',
        },
    }

export const styleAttributes = StyleSheet.create({
    scrollContainer:styles.scrollContainer,
    container: styles.loginContainer,
    title: styles.title,
    subtitle: styles.subtitle,
    input: styles.input,
    button: styles.button,
    buttonText: styles.buttonText,
    backLink: styles. backLink,
    backLinkText: styles. backLinkText,
    footer: styles.footer,
    footerText: styles.footerText,
    loginLink: styles.loginLink,
    link: styles.link,
    linkText: styles.linkText,
    registerLink: styles.registerLink,
    linkContainer: styles.linkContainer,
    contentBox: styles.contentBox,
    contentText: styles.contentText,
    logoutButton: styles.logoutButton,
    logoutButtonText: styles.logoutButtonText,
    homeContainer: styles.homeContainer,
});

