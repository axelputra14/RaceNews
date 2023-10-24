import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const MainLogo = () => {
  return (
    <View style={[styles.logoImageHeader]}>
      <Image
        source={{
          uri: "https://storage.googleapis.com/the-race-com.appspot.com/1/the-race-logo-full-white-shadow.png",
        }}
        style={[styles.logoImage]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoImageHeader: {
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
  },
  logoImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 30,
  },
});

export default MainLogo;
