import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import SignInScreen from "../Screens/SignInScreen"
import SignUpScreen from "../Screens/SignUpScreen"

export default AuthStackScreens = () => {
    const scheme = useColorScheme()
    const AuthStack = createStackNavigator();

    return (
        <AppearanceProvider>
            <AuthStack.Navigator headerMode="none"
             theme={scheme === "dark" ? DarkTheme : DefaultTheme}
            >
            <AuthStack.Screen name="SignIn" component={SignInScreen} />
            <AuthStack.Screen name="SignUp" component={SignUpScreen} />  
            </AuthStack.Navigator>
        </AppearanceProvider>
    )
}

