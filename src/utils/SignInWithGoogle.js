import * as Google from 'expo-google-app-auth';

import onSignIn from './GoogleSigInFirebase';
import { iOSClientID } from './keys';

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

export default signInWithGoogleAsync;
