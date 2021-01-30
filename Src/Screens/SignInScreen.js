import React, { useState, useContext } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { FirebaseContext, FirebaseProvider } from "../context/FirebaseContext"
import { UserContext } from "../context/UserContext"
import { useTheme } from "@react-navigation/native";



export default SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext)
  const [_, setUser] = useContext(UserContext)
  const {colors} = useTheme();

  const signIn = async () => {
    setLoading(true);

    

    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentuser().uid;

      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        name: userInfo.name,
        Email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn:true,
      })
    }catch (error) {
     alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
   
    <Container>
     
      <Main>
        <Text title semi center color="#fff">
          Welcome Back
        </Text>
      </Main>
      
      <Auth>
        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
           // autoFocus={true}
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
            
            textColor = "#ffffff"
            value={password}
          />
        </AuthContainer>
      </Auth>

      <SignInContainer onPress={signIn} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            Sign In
          </Text>
        )}
      </SignInContainer>

      <SignUp onPress={() => navigation.navigate("SignUp")}>
        <Text small center color="#fff">
          New to Varsity Soccer?{" "}
          <Text bold color="#E9446A">
            Sign Up
          </Text>
        </Text>
      </SignUp>
      
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
  margin-top: 192px;
`;

const Auth = styled.View`
  margin: 64px 32px 32px;
`;
const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #fff;
  border-bottom-width: 0.5px;
  height: 48px;
  color: #fff
`;

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #E9446A;
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const SignUp = styled.TouchableOpacity`
  margin: 16px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const RightCircle = styled.View`
  background-color: #E9446A;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const LeftCircle = styled.View`
  background-color: #2163F6;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const StatusBar = styled.View``;
