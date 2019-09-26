import React from 'react';
import { View, Button } from 'react-native';

import signInWithGoogleAsync from '../utils/SignInWithGoogle';
import signInWithFacebookAsync from '../utils/SignInWithFacebook';

import styles from '../Styles';

const LoginScreen = () => (
  <View style={styles.container}>
    <Button title="Sign In With Google" onPress={signInWithGoogleAsync} />
    <Button title="Sign In With Facebook" onPress={signInWithFacebookAsync} />
  </View>
);
export default LoginScreen;
