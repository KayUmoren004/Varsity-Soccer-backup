import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet,  View } from 'react-native';
import Text from "../components/Text"


import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"


import { UserContext } from "../context/UserContext"


import AuthStackScreens from "./AuthStackScreens"
import MainStackScreens from "./MainStackScreen"
import LoadingScreen from "../Screens/LoadingScreen"


export default AppStackScreens = () =>{
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext)

    return (
        <AppStack.Navigator
         >
           {user.isLoggedIn === null ? (
            <AppStack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false}} />
           ) : user.isLoggedIn ? (
            <AppStack.Screen name="Feed" component={MainStackScreens} options={{headerStyle: {backgroundColor: "#222222"}, headerTintColor: "#ffffff", headerTitleStyle: {fontSize: 24, fontWeight: "bold"}}} />
           ) : (
            <AppStack.Screen name="Auth" component={AuthStackScreens} options={{headerShown: false}} />
           )}
        </AppStack.Navigator>
  )
}

