// index.js

import { AppRegistry } from 'react-native';
import App from './App'; // Import the main App component from App.js
import { name as appName } from './app.json'; // Retrieves the name defined in app.json

/**
 * Registers the application's root component.
 *
 * AppRegistry is the JS entry point to running all React Native apps.
 * It registers the root component that is then loaded by the native environment.
 * The 'appName' must match the name used in your native projects (found in app.json).
 */
AppRegistry.registerComponent(appName, () => App);