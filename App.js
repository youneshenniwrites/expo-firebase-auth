import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import API from './src/utils/Firebase';
import { DashboardScreen, LoadingScreen, LoginScreen } from './src/screens';
import firebaseConfig from './src/utils/config';

API.initializeApp(firebaseConfig);

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
