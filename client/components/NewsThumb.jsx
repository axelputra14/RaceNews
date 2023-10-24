import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import OrangeLine from "./OrangeLine";
import BlackLine from "./BlackLine";
import { useNavigation } from "@react-navigation/native";
import MainLogo from "./MainLogo";
import moment from "moment/moment";

const NewsThumb = ({
  navigation,
  id,
  title,
  content,
  category,
  imgUrl,
  postedDate,
}) => {
  const [titleColor, setTitleColor] = useState("#000000");
  // console.log(navigation);
  const onPressTitleIn = () => {
    setTitleColor(() => "#ee7e00");
  };
  const onPressTitleOut = (id) => {
    setTitleColor(() => "#000000");
    navigation.navigate("Detail", { postId: +id });
  };
  return (
    <View>
      {/* start of single example of a post */}
      <MainLogo />
      <View>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: `${imgUrl}`,
            }}
            style={[styles.newsThumbnail]}
          ></Image>

          <View style={[styles.newsThumbnailDetail]}>
            <Text>{category}</Text>
            <Pressable
              onPressIn={onPressTitleIn}
              onPressOut={() => onPressTitleOut(id)}
              style={{ zIndex: 10 }}
            >
              <Text style={[styles.newsTitle, { color: titleColor }]}>
                {title}
              </Text>
            </Pressable>
            <Text>{content.substring(0, 255)}</Text>
            <Text style={[styles.newsDateHome]}>
              {moment(postedDate).format("MMMM Do YYYY")}
            </Text>
            <OrangeLine />
          </View>
        </View>
      </View>
      {/* end of single example of post */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  newsThumbnail: {
    height: 360,
    resizeMode: "cover",
  },
  newsTitle: {
    fontSize: 40,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "700",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  newsThumbnailDetail: {
    padding: 20,
  },
  newsDateHome: {
    marginTop: 25,
    marginBottom: 25,
  },
});

export default NewsThumb;
