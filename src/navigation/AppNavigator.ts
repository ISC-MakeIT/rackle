import { createAppContainer, createStackNavigator } from 'react-navigation';

import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';

export default createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      MyPage: { screen: MyPageScreen},
      Guide: { screen: GuideScreen },
    }
  )
);

