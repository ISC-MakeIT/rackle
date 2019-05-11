import { createAppContainer, createStackNavigator } from 'react-navigation';

import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';
import InitSetScreen from '../screens/InitSetScreen';

export default createAppContainer(
  createStackNavigator(
    {
      InitSet: { screen: InitSetScreen },
      Home: { screen: HomeScreen },
      Guide: { screen: GuideScreen },
      MyPage: { screen: MyPageScreen},
    }
  )
);

