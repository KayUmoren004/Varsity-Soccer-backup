import React from "react";
import styled from "styled-components";
import { Entypo, Ionicons } from "@expo/vector-icons";

import Text from "../components/Text";
//import { StatusBar } from 'react-native';
import tempData from "../../tempData"

const HomeScreen = () => {
  const renderPost = ({item}) => <PostContainer>
      <PostHeaderContainer>
        <PostProfilePhoto source={{uri: item.user.profilePhotoUrl}} />
        <PostInfoContainer>
          <Text bold color="#fff">{item.user.name}</Text>
          <Text tiny color="#fff" margin="4px 0 0 0">{item.postedAt}</Text>
        </PostInfoContainer>
        <Options>
          <Entypo name="dots-three-horizontal" size={16} color="#fff" />
        </Options>
      </PostHeaderContainer>

      <Post>
        <Text margin="0 0 8px 0" color="#fff">{item.post}</Text>
        <PostPhoto source={{uri: item.photoUrl}} />
        <PostDetails>
            <PostLikes>
              <Ionicons name="ios-heart-empty" size={24} color="#fff" />
              <Text tiny margin="0 0 0 8px" color="#fff">{item.likes}</Text>
            </PostLikes>
            <PostComments>
              <Ionicons name="ios-chatboxes" size={24} color="#fff" />
              <Text tiny margin="0 0 0 8px" color="#fff">{item.comments}</Text>
            </PostComments>
        </PostDetails>
      </Post>
    </PostContainer>
  

  return (
    <Container>
      <FeedContainer>
       

        <Feed data={tempData} renderItem={renderPost} keyExtractor={item => item.id.toString()}/>
      </FeedContainer>

      <StatusBar barStyle="light-content" />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000000;
  
`;

const FeedContainer = styled.View``;

const StatusBar = styled.StatusBar``;

const Feed = styled.FlatList`
  
`;

const PostContainer = styled.View`
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
  border-radius: 24px
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
export default HomeScreen;
