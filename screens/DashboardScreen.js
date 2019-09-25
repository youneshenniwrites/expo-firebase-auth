import React from 'react';
import { View, Button } from 'react-native';

import firebase from 'firebase';

import styles from './Styles';

const DashboardScreen = () => {
  const SignOut = () => firebase.auth().signOut();
  return (
    <View style={styles.container}>
      <Button onPress={SignOut} title="Sign Out" />
    </View>
  );
};
export default DashboardScreen;
