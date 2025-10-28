### Overview
This is a react native project to be used as a proof of concept.  It is done entirely
in javascript and uses react native libraries to compile the source code into Android
or IPhone.  It uses a serverless backend that provides functionality to register, login,
confirm, or reset password.  It contains one secure endpoint(home content) which 
requires a token assigned by cognito to render.

### Pre-requisites

This requires nodejs as well as npx.

### Running the app in your cell phone

After installing the serverless backend, you will need to enter the base url in the
constants.js file in the src directory.  

Enable the developer options on your cell phone to allow npx to deploy to your cell
phone  

Then run the command to deploy to your cell phone.

npx react-native run-android

### Serverless Backend

The repo can be found here [Repo](https://github.com/cschellberg/MobileMembersServerless)


