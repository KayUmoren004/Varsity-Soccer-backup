import React, { Component } from "react";
import styled from "styled-components";
import { Entypo, Ionicons } from "@expo/vector-icons";

import Text from "../components/Text";
//import { StatusBar } from 'react-native';
import tempData from "../../tempData";
import firebase from "firebase";
import config from "../config/firebase";
import {Divider} from "react-native-paper"

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.firestore();

class GamesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    db.collection("games")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        this.setState({ games: data });
      });
  }

  renderPost = ({ item }) => (
   <GamesContainer>
     <GamesHeaderContainer>
       <Text bold medium color="#fff">{item.name}</Text>
       <Text medium semi color="#9bd1fa">{item.date}</Text>
     </GamesHeaderContainer>

     <Games>
       <TeamLogos>
       <HomeTeamLogo source={{uri: item.homeimage}} resizeMethod="resize" resizeMode="contain"/>
       <Text heavy large color="#fff">{item.homescore}</Text>
       <VSLogo source={{uri: item.vsimage}} resizeMethod="resize" resizeMode="contain"/>
       <Text heavy large color="#fff">{item.awayscore}</Text>
       <AwayTeamLogo source={{uri: item.awayimage}} resizeMethod="resize" resizeMode="contain"/>
       </TeamLogos>

      <Divider
        style={{
          backgroundColor: "#87ceeb",
          marginBottom: 10,
          marginTop: 10
        }}
        />
       <Teams>
         <Text  medium color="#fff">{item.game}</Text>
       </Teams>

       <Divider
        style={{
          backgroundColor: "#87ceeb",
          marginTop: 10
        }}
        />

       <TimeAndLocation>
         <Text heavy medium color="#fff">{item.time}</Text>
         <Text heavy medium color="#fff">{item.location}</Text>
       </TimeAndLocation>

     </Games>
   </GamesContainer>
  );

  render() {
    return (
      <Container>
        <FeedContainer>
         
          <Feed
            data={this.state.games}
            renderItem={this.renderPost}
            ItemSeparatorComponent={() => (
              <Divider
        style={{
          backgroundColor: "#fff",
        }}
        />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </FeedContainer>

        <StatusBar barStyle="light-content" />
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #000000;
 
`;

const FeedContainer = styled.View``;

const StatusBar = styled.StatusBar``;

const Feed = styled.FlatList``;

const GamesContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #000000;
  border-radius: 6px;
  padding: 8px;
`;

const GamesHeaderContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

const Games = styled.View``;

const TeamLogos = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const HomeTeamLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

const VSLogo = styled.Image`
  width: 70px;
  height: 70px;
`;

const AwayTeamLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

/*const TeamScores = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;*/

const Teams = styled.View`
  margin-bottom: 10px;
  align-items: center;
`;

const TimeAndLocation = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`;


export default GamesScreen;


/* <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto source={{ uri: item.awayImage }} />
        <PostInfoContainer>
          <Text bold color="#fff">
            {item.away}
          </Text>
          <Text tiny color="#fff" margin="4px 0 0 0">
            {item.date}
          </Text>
        </PostInfoContainer>
        <Options>
          <Entypo name="dots-three-horizontal" size={16} color="#fff" />
        </Options>
      </PostHeaderContainer>

      <Post>
        <Text margin="0 0 8px 0" color="#fff">
          {item.home}
        </Text>
        <PostPhoto source={{ uri: item.homeImage }} />
        <PostDetails>
          <PostLikes>
            <Ionicons name="ios-heart-empty" size={24} color="#fff" />
            <Text tiny margin="0 0 0 8px" color="#fff">
              {item.dash}
            </Text>
          </PostLikes>
          <PostComments>
            <Ionicons name="ios-chatboxes" size={24} color="#fff" />
            <Text tiny margin="0 0 0 8px" color="#fff">
              {item.time}
            </Text>
          </PostComments>
        </PostDetails>
      </Post>
    </PostContainer>*/

    /*const PostContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #000000;
  border-radius: 6px;
  padding: 8px;
`;

const PostHeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`;

const PostProfilePhoto = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 24px;
`;

const PostInfoContainer = styled.View`
  flex: 1;
  margin: 0 16px;
`;

const Options = styled.View``;

const Post = styled.View`
  margin-bottom: 20px;
`;

const PostPhoto = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 6px;
`;

const PostDetails = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const PostLikes = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PostComments = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
`;
*/

  /*<TeamScores>
       <Text>{item.homeScore}</Text>
       <Text>{item.dash}</Text>
       <Text>{item.awayScore}</Text>
       </TeamScores>*/