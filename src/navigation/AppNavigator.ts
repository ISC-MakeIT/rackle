import { createAppContainer, createStackNavigator } from 'react-navigation';

import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      Guide: { screen: GuideScreen },
    }
  )
);

