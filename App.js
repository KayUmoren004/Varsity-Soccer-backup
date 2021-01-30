import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import { UserProvider } from "./Src/context/UserContext";
import { FirebaseProvider } from "./Src/context/FirebaseContext";
import AppStackScreens from "./Src/Stacks/AppStackScreens";


export default App = () => {
  const scheme = useColorScheme()
  return(
    <AppearanceProvider>
      <FirebaseProvider>
      <UserProvider>
       <NavigationContainer
       theme={scheme === "dark" ? DarkTheme : DefaultTheme}
       >
      <AppStackScreens />
    </NavigationContainer>
    </UserProvider>
    </FirebaseProvider>
    </AppearanceProvider>
   
  )
}