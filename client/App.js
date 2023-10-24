import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView } from "react-native";
import HomePage from "./screens/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackView,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import DetailPage from "./screens/DetailPage";
import { ApolloProvider } from "@apollo/client";
import client from "./config";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={() => ({ headerShown: false })}>
          <Stack.Screen name="Home" component={HomePage} />

          <Stack.Screen name="Detail" component={DetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
