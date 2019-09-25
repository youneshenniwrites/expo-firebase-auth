import React from 'react';
import { View, Button } from 'react-native';

import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

import styles from './Styles';
import { iOSClientID } from '../keys';

const LoginScreen = () => {
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const { providerData } = firebaseUser;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };
  const onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(response => {
              if (response.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref(`users/${response.user.uid}`)
                  .set({
                    email: response.user.email,
                    firstName: response.additionalUserInfo.profile.given_name,
                    lastName: response.additionalUserInfo.profile.family_name,
                    locale: response.additionalUserInfo.profile.locale,
                    profilePicture: response.additionalUserInfo.profile.picture,
                    createdAt: Date.now(),
                  });
              } else {
                firebase
                  .database()
                  .ref(`users/${response.user.uid}`)
                  .update({
                    lastLogIn: Date.now(),
                  });
              }
            })
            .catch(err => console.log(err));
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
  };
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: iOSClientID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      console.log(e);
      return { error: true };
    }
  };
  return (
    <View style={styles.container}>
      <Button title="Sign In With Google" onPress={signInWithGoogleAsync} />
    </View>
  );
};
export default LoginScreen;
