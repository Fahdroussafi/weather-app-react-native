import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment-timezone";

import Clear from "../assets/01d.svg";
import Clouds from "../assets/03n.svg";
import Rain from "../assets/09d.svg";
import Snow from "../assets/11d.svg";

const FutureForecast = ({ data }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {data && data?.length > 0 ? (
        data?.map(
          (data, idx) =>
            idx !== 0 && <FutureForecastItem key={idx} forecastItem={data} />
        )
      ) : (
        <View />
      )}
    </View>
  );
};

const FutureForecastItem = ({ forecastItem }) => {
  return (
    <View style={styles.futureForecastItemContainer}>
      <Text style={styles.day}>
        {moment(forecastItem.dt * 1000).format("ddd")}
      </Text>
      <View>
        {forecastItem.weather[0].main === "Clear" ? (
          <Clear width={100} height={100} />
        ) : forecastItem.weather[0].main === "Clouds" ? (
          <Clouds width={100} height={100} />
        ) : forecastItem.weather[0].main === "Rain" ? (
          <Rain width={100} height={100} />
        ) : forecastItem.weather[0].main === "Snow" ? (
          <Snow width={100} height={100} />
        ) : (
          <View />
        )}
      </View>
      <Text style={styles.tempDay}>
        Day - {forecastItem.temp.day.toFixed(0)}&deg; C
      </Text>
      <Text style={styles.tempNight}>
        Night - {forecastItem.temp.night.toFixed(0)}&deg; C
      </Text>
    </View>
  );
};

export default FutureForecast;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  futureForecastItemContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000033",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 20,
    marginLeft: 10,
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
  tempDay: {
    fontSize: 14,
    color: "white",
    borderRadius: 50,
    backgroundColor: "#3c3c44",
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
  },
  tempNight: {
    fontSize: 14,
    color: "black",
    borderRadius: 50,
    backgroundColor: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 10,
  },
});
