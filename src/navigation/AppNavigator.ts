import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(
  createStackNavigator({ Home: { screen: HomeScreen, }, })
);

