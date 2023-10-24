import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import BlackLine from "../components/BlackLine";
import Footer from "../components/Footer";

import { useLazyQuery, useQuery } from "@apollo/client";
import moment from "moment/moment";

import { GET_NEWS_BY_ID, GET_USER_BY_ID } from "../queries/index";

const DetailPage = ({ route, navigation }) => {
  const { postId } = route.params;

  const { loading, error, data } = useQuery(GET_NEWS_BY_ID, {
    variables: { postId },
  });
  // console.log(data?.post.Tags, "aaaa");
  const [dispatch, { data: writer }] = useLazyQuery(GET_USER_BY_ID);
  // console.log("----++");
  // console.log(writer?.user);
  useEffect(() => {
    // console.log("mengapa begini");
    if (data?.post.authorId) {
      // console.log("kyaa");
      // console.log(data?.post.authorId);
      dispatch({
        variables: { userId: data.post.authorId },
      });
    }
  }, [data]);

  const headerLogoPress = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={[styles.container]}>
            {/* start of single example of a post */}
            <View style={[styles.logoImageHeader]}>
              <Pressable onPress={headerLogoPress} style={{ zIndex: 10 }}>
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/the-race-com.appspot.com/1/the-race-logo-full-white-shadow.png",
                  }}
                  style={[styles.logoImage]}
                />
              </Pressable>
            </View>
            <View>
              <View style={{ flex: 1 }}>
                <Image
                  source={{
                    uri: `${data?.post.imgUrl}`,
                  }}
                  style={[styles.newsDetailThumbnail]}
                ></Image>

                <View style={[styles.newsDetail]}>
                  <Text>{data?.post.Category.name}</Text>

                  <Text style={[styles.newsTitleInDetail]}>
                    {data?.post.title}
                  </Text>

                  <Text style={[styles.newsDate]}>
                    {moment(data?.post.createdAt).format("MMMM Do YYYY")}
                  </Text>
                  <Text style={[styles.newsWriter]}>
                    {writer?.user.username}
                  </Text>
                  <BlackLine />

                  <Text style={[styles.newsFull]}>{data?.post.content}</Text>
                  <Text style={[styles.tagtitle]}>Tags: </Text>

                  {data?.post.Tags.map((tag) => (
                    <View key={tag.id}>
                      <Text style={[styles.taglist]}>{tag.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            {/* end of single example of post */}
            <Footer></Footer>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
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
    backgroundColor: "transparent",
  },
  logoImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 30,
  },
  newsDetailThumbnail: {
    height: 360,
    resizeMode: "cover",
  },
  newsTitleInDetail: {
    fontSize: 40,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: "700",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  newsDetail: {
    padding: 20,
  },
  newsDate: {
    marginTop: 25,
    marginBottom: 25,
  },
  newsWriter: {
    marginBottom: 25,
  },
  newsFull: {
    marginTop: 25,
    lineHeight: 22,
  },
  tagtitle: {
    fontWeight: 600,
    marginTop: 25,
  },
  taglist: {
    fontStyle: "italic",
  },
});

export default DetailPage;
