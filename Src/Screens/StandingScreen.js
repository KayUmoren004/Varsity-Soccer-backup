import React, { Component } from "react";
import styled from "styled-components";
import {Entypo, Ionicons} from '@expo/vector-icons'
import Text from "../components/Text";
import firebase from "firebase";
import config from "../config/firebase";
import {Divider} from "react-native-paper"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SCGStandingsScreen from "../Screens/SCGStandingsScreen"
import SCBStandingsScreen from "../Screens/SCBStandingsScreen"

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

import tempData from "../../tempData";

const Tab = createMaterialTopTabNavigator()


 const StandingScreen = () => {
 
    return (
     

      <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: "#000"},
        labelStyle: {fontSize: 15, fontWeight: "200", color: "#fff"}
      }}
      >
        <Tab.Screen name = "Suburband Council Blue" component = {SCBStandingsScreen} />
        <Tab.Screen name = "Suburband Council Gray" component = {SCGStandingsScreen} />
      </Tab.Navigator>
    )
 }

 const Container = styled.View`
  flex: 1;
  background-color: #000000;
  padding-top: 44px;
`;

  

export default StandingScreen;