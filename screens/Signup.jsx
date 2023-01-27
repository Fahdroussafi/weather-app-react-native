import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

// keyboard avoiding wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// formik
import { Formik } from "formik";

// aysnc-storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "../components/CredentialsContext";

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { View, ActivityIndicator } from "react-native";

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Ionicons } from "@expo/vector-icons";
const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  //context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://192.168.9.31:8080/api/auth/create-user";
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data, token, name } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Welcome");
          persistLogin({ ...data, token, name }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage("An error occurred. Check your network and try again");
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("weatheAppCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .error((error) => {
        console.log(error);
        handleMessage("Persisting login failed");
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <PageTitle>SkyWatch</PageTitle>
          <SubTitle>Account Signup</SubTitle>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.email == "" ||
                values.password == "" ||
                values.name == "" ||
                values.confirmPassword == ""
              ) {
                handleMessage("Please fill in all fields.");
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage("Passwords do not match.");
                setSubmitting(false);
              } else {
                handleMessage("Signing up...", "SUCCESS");
                handleSignup(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Enter your full name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Enter your email address"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Signup</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent> Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Signup;
