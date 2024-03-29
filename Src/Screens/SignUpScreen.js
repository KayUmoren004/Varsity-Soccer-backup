import React, { useContext, useState } from "react";
import { Platform } from 'react-native'
import styled from "styled-components";
import Text from "../components/Text";
import { AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker'
import { FirebaseContext, FirebaseProvider } from "../context/FirebaseContext"
import { UserContext } from "../context/UserContext"

export default SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(false);
  const firebase = useContext(FirebaseContext)
  const [_, setUser] = useContext(UserContext)

  const getPermission = async () => {
      if (Platform.OS !== "web") {
          const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

          return status;
      }
  }

  const pickImage = async () => {
      try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5
        })

        if (!result.cancelled) {
            setProfilePhoto(result.uri)
        }
      }catch{
          console.log("Error @pickImage: ", error)
      }
  }

  const addProfilePhoto = async () => {
      const status = await getPermission();

      if (status !== "granted") {
          alert("We need permission to access your camera roll.")

          return;
      }

      pickImage()
  }

  const signUp = async () => {
    setLoading(true);

    const user = {name, email, password, profilePhoto};

    try {
      const createdUser = await firebase.createUser(user)

      setUser({...createdUser, isLoggedIn: true})
    }catch (error) {
      console.log("Error @signUp: ", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Main>
        <Text title semi center color="#fff">
          Sign Up to Get Started
        </Text>
      </Main>

        <ProfilePhotoContainer onPress={addProfilePhoto}>
        {profilePhoto ? (
            <ProfilePhoto source={{uri: profilePhoto}} />
        ) : (
             <DefaultProfilePhoto>
                <AntDesign name="plus" size={24} color="#ffffff" />
            </DefaultProfilePhoto>
        )}
           
        </ProfilePhotoContainer>
      <Auth>
      <AuthContainer>
          <AuthTitle>Name</AuthTitle>
          <AuthField
            autoCapitalize="words"
            autoCorrect={false}
           // autoFocus={true}
            onChangeText={(name) => setName(name)}
            value={name}
            textColor = "#ffffff"
          />
        </AuthContainer>
        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>Password</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </AuthContainer>
      </Auth>

      <SignUpContainer onPress={signUp} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            Sign Up
          </Text>
        )}
      </SignUpContainer>

      <SignIn onPress={() => navigation.navigate("SignIn")}>
        <Text small center color="#fff">
          Already have an account?{" "}
          <Text bold color="#2163F6">
            Sign In
          </Text>
        </Text>
      </SignIn>

      <HeaderGraphic>
        <RightCircle />
        <LeftCircle />
        <StatusBar barStyle="light-content" />
      </HeaderGraphic>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000000

`;

const Main = styled.View`
  margin-top: 160px;
`;

const ProfilePhotoContainer=styled.TouchableOpacity`
    background-color: #e1e2e6;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    align-self: center;
    margin-top: 16px;
    overflow: hidden;
`;

const DefaultProfilePhoto = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const ProfilePhoto = styled.Image`
    flex:1;
`;

const Auth = styled.View`
  margin: 16px 32px 32px;
`;
const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: #FFF;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #FFF;
  border-bottom-width: 0.5px;
  height: 48px;
  color: #fff

`;

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #2163F6;
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const SignIn = styled.TouchableOpacity`
  margin: 16px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const RightCircle = styled.View`
  background-color: #2163F6;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const LeftCircle = styled.View`
  background-color: #E9446A;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const StatusBar = styled.View``;
