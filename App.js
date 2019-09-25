import * as firebase from 'firebase';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { DashboardScreen, LoadingScreen, LoginScreen } from './screens';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginScreen,
      DashboardScreen,
    },
    {
      initialRouteName: 'LoadingScreen',
    }
  )
);
