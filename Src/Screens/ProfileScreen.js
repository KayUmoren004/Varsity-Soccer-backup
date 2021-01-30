import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";
import styled from "styled-components";
import Text from "../components/Text";

const ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const logOut = async () => {
    const loggedOut = await firebase.logOut()

    if (loggedOut) {
      setUser(state => ({...state, isLoggedIn: false}))
    }
  }
  return (
    <Container>
      <ProfilePhotoContainer>
        <ProfilePhoto
          source={
            user.profilePhotoUrl === "default"
              ? require("../../assets/defaultProfilePhoto.jpeg")
              : { uri: user.profilePhotoUrl }
          }
        />
      </ProfilePhotoContainer>

      <Text color="#ffffff" medium bold margin = "16px 0 32px 0">
        {user.name}
      </Text>

      <StatsContainer>

        <StatContainer>
          <Text large bold color="#ffffff">21</Text>
          <Text small light color="#ffffff">Goals</Text>
        </StatContainer>

        <StatContainer>
          <Text large bold  color="#ffffff">120</Text>
          <Text small light center color="#ffffff">Passes and Crosses</Text>
        </StatContainer>

        <StatContainer>
          <Text large bold  color="#ffffff">45</Text>
          <Text small light color="#ffffff">Shots</Text>
        </StatContainer>

        <StatContainer>
          <Text large bold  color="#ffffff">15</Text>
          <Text small light color="#ffffff">Fouls</Text>
        </StatContainer>

      </StatsContainer>

      <Logout onPress={logOut}>
        <Text medium bold color="#23a8d9">Log Out</Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  
  flex: 1;
  background-color: #000000
`;

const StatsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 32px;
  flex: 1;
`;

const StatContainer = styled.View`
align-items: center;
  flex: 1
  
`;

const ProfilePhotoContainer = styled.View`
  shadow-opacity: 0.8;
  margin-top: 64px;
  shadow-radius: 30px;
  shadow-color: #d2d2d2;
  
`;

const ProfilePhoto = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 64px;
`;

const Logout = styled.TouchableOpacity`
  margin-bottom: 32px;
  position: absolute;
  bottom: 0;
`;

export default ProfileScreen;

/*class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> ProfileScreen </Text>
      </View>
    );
  }
}

export default ProfileScreen;
*/
