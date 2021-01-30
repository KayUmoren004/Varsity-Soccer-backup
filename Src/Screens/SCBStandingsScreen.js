import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SCBStandingsScreen extends Component {
  static navigationOptions = {
   headerShown: true,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> SCBStandingsScreen </Text>
      </View>
    );
  }
}

export default SCBStandingsScreen;
