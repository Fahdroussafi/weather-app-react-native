import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import * as Location from "expo-location";

import DateTime from "../components/DateTime";
import WeatherScroll from "../components/WeatherScroll";

import {
  InnerContainer,
  ButtonText,
  StyledButtonLogout,
  StyledFormArealogout,
} from "../components/styles";

const img = require("../assets/image.png");

const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";

const Welcome = ({ navigation }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchDataFromApi("32.300815", "-9.227203");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <ImageBackground source={img} style={styles.image}>
          <DateTime
            current={data.current}
            timezone={data.timezone}
            lat={data.lat}
            lon={data.lon}
          />
          <WeatherScroll weatherData={data.daily} />
        </ImageBackground>
      </View>
      <InnerContainer>
        <StyledFormArealogout>
          <StyledButtonLogout onPress={() => {}}>
            <ButtonText onPress={() => navigation.navigate("Login")}>
              Logout
            </ButtonText>
          </StyledButtonLogout>
        </StyledFormArealogout>
      </InnerContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Welcome;
