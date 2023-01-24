import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  Avatar,
} from "../components/styles";

const Welcome = () => {
  return (
    <>
      <StatusBar style="dark" />
      <InnerContainer>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome ! </PageTitle>
          <SubTitle welcome={true}>TEST</SubTitle>

          <StyledFormArea>
            <Avatar
              resizeMode="cover"
              source={require("../assets/weather.png")}
            />
            <Line />
            <StyledButton onPress={() => {}}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
