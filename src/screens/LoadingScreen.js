/* eslint-disable react/prop-types */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import API from '../utils/Firebase';
import styles from '../Styles';

const LoadingScreen = ({ navigation }) => {
  const isUserLoggedIn = React.useCallback(() => {
    API.auth().onAuthStateChanged(user =>
      user
        ? navigation.navigate('DashboardScreen')
        : navigation.navigate('LoginScreen')
    );
  }, [navigation]);

  React.useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};
export default LoadingScreen;
