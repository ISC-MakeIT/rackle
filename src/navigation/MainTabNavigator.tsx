import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, TabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';
import ElevatorScreen from '../screens/ElevatorScreen';
import MapScreen from '../screens/MapScreen';

const GuideStack = createStackNavigator({ Guide: { screen: GuideScreen } });
const HomeStack = createStackNavigator({ Home: { screen: HomeScreen } });
const MyPageStack = createStackNavigator({ MyPage: { screen: MyPageScreen } });
const ElevatorStack = createStackNavigator({ Elevator: { screen: ElevatorScreen } });
const MapStack = createStackNavigator({ Map: { screen: MapScreen } });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

MyPageStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

ElevatorStack.navigationOptions = {
  tabBarLabel: 'Elevator',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

GuideStack.navigationOptions = { tabBarVisible: true };

const tabNavigator = createBottomTabNavigator({ HomeStack, MyPageStack, ElevatorStack }, {
  tabBarOptions: {
    activeTintColor: '#312D2D',
    inactiveTintColor: '#312D2D',
    showLabel: false, // TODO 確認
  },
});

export default createStackNavigator({
  Main: { screen: tabNavigator },
  Guide: { screen: GuideStack },
  Elevator: { screen: ElevatorStack },
  Map: { screen: MapStack },
}, {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);
