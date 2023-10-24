import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const Footer = () => {
  const footerLogoPress = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <View style={[styles.containerFooter]}>
        <Text style={[styles.introductionFooter]}>
          RaceNews started in 2018 as a digital-only motorsport channel. Our aim
          is to insert goals here and here and here while do that and this and
          that for selling the selling point of the company for a better future
          test text.
        </Text>
        <Pressable onPress={footerLogoPress} style={{ zIndex: 10 }}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/the-race-com.appspot.com/1/the-race-logo-full-white-shadow.png",
            }}
            style={[styles.logoFooter]}
          ></Image>
        </Pressable>
        <Text style={[styles.termsFooter]}>
          Privacy Policy {"\n"}
          Terms & Conditions {"\n"}
          {"\n"}
          All Content RaceNews 2023{"\n"}
          All Rights Reserved.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerFooter: {
    flex: 1,
    backgroundColor: "#252525",
    paddingHorizontal: 20,
  },
  logoFooter: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 40,
  },
  introductionFooter: {
    marginTop: 30,
    marginBottom: 30,
    color: "#efefef",
  },
  termsFooter: {
    marginTop: 30,
    marginBottom: 50,
    color: "#efefef",
  },
});

export default Footer;
