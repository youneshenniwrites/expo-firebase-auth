import React from 'react';
import { View, Button } from 'react-native';

import SignOut from '../utils/SignOut';
import styles from '../Styles';

const DashboardScreen = () => (
  <View style={styles.container}>
    <Button onPress={SignOut} title="Sign Out" />
  </View>
);
export default DashboardScreen;
