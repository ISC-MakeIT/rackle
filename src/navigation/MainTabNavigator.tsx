import * as React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import GuideScreen from "../screens/GuideScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import MovieNavigateScreen from "../screens/MovieNavigateScreen";
import MyPageScreen from "../screens/MyPageScreen";

const GuideStack = createStackNavigator({ Guide: { screen: GuideScreen } });
const HomeStack = createStackNavigator({ Home: { screen: HomeScreen } });
const MapStack = createStackNavigator({ Map: { screen: MapScreen } });
const MovieNavigateStack = createStackNavigator({ MovieNavigate: { screen: MovieNavigateScreen } });
const MyPageStack = createStackNavigator({ MyPage: { screen: MyPageScreen } });

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  ),
};

MyPageStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
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

const tabNavigator = createBottomTabNavigator({ HomeStack, MyPageStack, MapStack, MovieNavigateStack }, {
  tabBarOptions: {
    activeTintColor: '#037aff',
    inactiveTintColor: '#737373',
    showLabel: false, // TODO 確認
  },
});

export default createStackNavigator({
  Main: { screen: tabNavigator },
  Guide: { screen: GuideStack },
  Map: { screen: MapStack },
  // Movie: { screen: MovieNavigateStack },
}, {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);
