import { Alert } from 'react-native';

import * as Facebook from 'expo-facebook';

// import API from './Firebase';
import { facebookAppId } from './keys';

const signInWithFacebookAsync = async () => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      facebookAppId,
      {
        permissions: ['public_profile'],
      }
    );
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const formattedData = await response.json();
      console.log(formattedData);
      Alert.alert('Logged in!', `Hi ${formattedData.name}!`);
      // const credential = API.auth.FacebookAuthProvider.credential(token);
      // API.auth()
      //   .signInWithCredential(credential)
      //   .catch(err => console.log(err));
    } else {
      console.log('Error Response');
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export default signInWithFacebookAsync;
