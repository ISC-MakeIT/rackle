import * as React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createStackNavigator } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import GuideScreen from "../screens/GuideScreen";
import HomeScreen from "../screens/HomeScreen";
import MyPageScreen from "../screens/MyPageScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Guide: GuideScreen,
}, {
    initialRouteName: "Home",
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  ),
};

const MyPageStack = createStackNavigator({
    MyPage: MyPageScreen,
});

MyPageStack.navigationOptions = {
    tabBarLabel: "Account",
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
        />
    ),
};

export default createBottomTabNavigator({
  HomeStack,
  MyPageStack,
}, {
    tabBarOptions: {
        activeTintColor: "#037aff",
        inactiveTintColor: "#737373",
        showLabel: false, // TODO 確認
    },
});
