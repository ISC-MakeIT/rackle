import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import GuideScreen from '../screens/GuideScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';

const HomeStack = createStackNavigator({ Home: { screen: HomeScreen } });
const MyPageStack = createStackNavigator({ MyPage: { screen: MyPageScreen } });
const MovieNavigateStack = createStackNavigator({ MovieNavigate: { screen: MovieNavigateScreen } });
const GuideStack = createStackNavigator({ Guide: { screen: GuideScreen } });

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
  ),
};

MyPageStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

MovieNavigateStack.navigationOptions = {
  tabBarLabel: 'Movie',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

GuideStack.navigationOptions = { tabBarVisible: true };

const tabNavigator = createBottomTabNavigator({ HomeStack, MyPageStack, MovieNavigateStack }, {
  tabBarOptions: {
    activeTintColor: '#037aff',
    inactiveTintColor: '#737373',
    showLabel: false, // TODO 確認
  },
});
SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
};

export default createStackNavigator({
  Main: { screen: tabNavigator },
  Guide: { screen: GuideStack },
}, {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);
