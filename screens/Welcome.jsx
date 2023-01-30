import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";
import * as Location from "expo-location";

import DateTime from "../components/DateTime";
import WeatherScroll from "../components/WeatherScroll";

import Constants from "expo-constants";

import {
  InnerContainer,
  ButtonText,
  StyledButtonLogout,
  StyledFormArealogout,
} from "../components/styles";

// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "./../components/CredentialsContext";

const API_KEY = Constants.expoConfig.extra.apiKey;

const Welcome = () => {
  const [data, setData] = useState({});

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchDataFromApi("32.3008", "-9.2272");
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

  const clearLogin = () => {
    AsyncStorage.removeItem("weatheAppCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  let img = "";
  if (data.current) {
    if (data.current.weather[0].main === "Clear") {
      img = require("../assets/clear.jpg");
    } else if (data.current.weather[0].main === "Clouds") {
      img = require("../assets/clouds.jpg");
    } else if (data.current.weather[0].main === "Rain") {
      img = require("../assets/rain.jpg");
    } else if (data.current.weather[0].main === "Thunderstorm") {
      img = require("../assets/thunderstorm.jpg");
    }
  }

  return (
    <>
      <StatusBar style={(data.current && "light") || "dark"} />
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
          <StyledButtonLogout onPress={clearLogin}>
            <ButtonText>Logout</ButtonText>
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
