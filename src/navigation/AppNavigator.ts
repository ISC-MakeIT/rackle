import { createAppContainer, createStackNavigator } from 'react-navigation';

import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';
import ElevatorScreen from '../screens/ElevatorScreen';

export default createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      Guide: { screen: GuideScreen },
      Elevator: { screen: ElevatorScreen },
    }
  )
);

