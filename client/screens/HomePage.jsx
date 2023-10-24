import React from "react";
import { StyleSheet, ScrollView, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { useQuery } from "@apollo/client";
import { GET_NEWS } from "../queries";
import NewsThumb from "../components/NewsThumb";
import Footer from "../components/Footer";

const HomePage = ({ navigation, item }) => {
  const { data, loading } = useQuery(GET_NEWS);

  if (loading) return <Text>Loading ...</Text>;
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <ScrollView style={[styles.container]}> */}
          {/* <Text>{data} where</Text> */}
          {/* di sini */}
          <FlatList
            data={data?.posts.data}
            renderItem={({ item }) => (
              <NewsThumb
                id={item.id}
                title={item.title}
                content={item.content}
                category={item.Category.name}
                imgUrl={item.imgUrl}
                tags={item.tags}
                authorId={item.authorId}
                postedDate={item.createdAt}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
            style={[styles.container]}
          >
            <Footer></Footer>
          </FlatList>

          {/* </ScrollView> */}
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
  },
  logoImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 30,
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

export default HomePage;
