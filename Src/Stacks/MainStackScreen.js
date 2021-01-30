import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from "../Screens/HomeScreen";
import StandingScreen from "../Screens/StandingScreen";
import GamesScreen from "../Screens/GamesScreen";
import NotificationsScreen from "../Screens/NotificationsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    switch (routeName) {
      case 'Notifications':
        return 'Notifications'
      case 'Standings':
        return 'Suburban Council Standings'
        case 'Home':
          return 'Feed'
        case 'Profile':
          return 'Profile'
          case 'Games':
            return ' Games Schedule'
    }
  }

 

export default MainStackScreen = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  const MainStack = createBottomTabNavigator();

  const scheme = useColorScheme()

  const StandingsStack = createStackNavigator()

  

  function StandingsStackScreen() {
    return(
      <StandingsStack.Navigator>
        <StandingsStack.Screen name = "Suburban Council Standings" component = {StandingScreen} options = {{title: "Suburban Council Standings"}} />
      </StandingsStack.Navigator>
    )
  }


  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: "#222222",
      paddingBottom: 12,
      borderTopWidth: 0
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "ios-home";

      switch (route.name) {
        case "Notifications":
          iconName = "ios-notifications";
          break;

        case "Standings":
          iconName = "md-reorder";
          break;

        case "Home":
          iconName = "ios-home";
          break;

        case "Profile":
          iconName = "ios-person";
          break;

        case "Games":
          iconName = "ios-football";
          break;

        default:
          iconName = "ios-home";
      }

    

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? "#ffffff" : "#666666"}
        />
      );
    },
  });

  return (
  <AppearanceProvider>
      <MainStack.Navigator
      initialRouteName="Home"
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
      theme={scheme === "dark" ? DarkTheme : DefaultTheme}
    >
    <MainStack.Screen name="Games" component={GamesScreen} />
      <MainStack.Screen name="Standings" component={StandingScreen} />
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Notifications" component={NotificationsScreen}   />
      <MainStack.Screen name="Profile" component={ProfileScreen}   />
    </MainStack.Navigator>
  </AppearanceProvider>
  );
};

/*
*/
