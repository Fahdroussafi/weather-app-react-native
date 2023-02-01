import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import moment from "moment-timezone";
import FutureForecast from "./FutureForecast";

import Clear from "../assets/01d.svg";
import Clouds from "../assets/03n.svg";
import Rain from "../assets/09d.svg";
import Snow from "../assets/11d.svg";


const WeatherScroll = ({ weatherData }) => {
  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      <CurrentTempEl
        data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}
      />
      <FutureForecast data={weatherData} />
    </ScrollView>
  );
};

const CurrentTempEl = ({ data }) => {
  if (data && data.weather) {
    return (
      <View style={styles.currentTempContainer}>
        <View>
          {data.weather[0].main === "Clear" ? (
            <Clear width={100} height={100} />
          ) : data.weather[0].main === "Clouds" ? (
            <Clouds width={100} height={100} />
          ) : data.weather[0].main === "Rain" ? (
            <Rain width={100} height={100} />
          ) : data.weather[0].main === "Snow" ? (
            <Snow width={100} height={100} />
          ) : (
            <View />
          )}
        </View>
        <View style={styles.otherContainer}>
          <Text style={styles.day}>
            {moment(data.dt * 1000).format("dddd")}
          </Text>
          <Text style={styles.temp}>
            Min - {data.temp.min.toFixed(0)}&deg; C
          </Text>
          <Text style={styles.temp}>
            Max - {data.temp.max.toFixed(0)}&deg; C
          </Text>
          <Text style={styles.temp}>
            Day - {data.temp.day.toFixed(0)}&deg; C
          </Text>
          <Text style={styles.temp}>
            Night - {data.temp.night.toFixed(0)}&deg; C
          </Text>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 0.4,
    backgroundColor: "#00000033",
    padding: 30,
  },
  image: {
    width: 150,
    height: 150,
  },
  currentTempContainer: {
    flexDirection: "row",
    backgroundColor: "#00000033",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 15,
  },
  day: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#3c3c44",
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    fontWeight: "200",
    marginBottom: 15,
    borderColor: "#eee",
    borderWidth: 1,
  },
  temp: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
  },
  otherContainer: {
    paddingRight: 40,
  },
});

export default WeatherScroll;
