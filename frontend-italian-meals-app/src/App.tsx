import React from "react";
import {StyleSheet,Text,TextInput,Pressable, View,KeyboardAvoidingView,Platform, ScrollView,} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./Screens/HomeScreen"
import DetailsScreen from "./Screens/DetailsScreen"

const Stack =createNativeStackNavigator();
const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
    Home: "home",
    Dettagli: "details/:id",
  },
},
};


export default function App() {


  return (
   
      <NavigationContainer linking={linking}>
        <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />

        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  }, 

  error: {
    color: "red",
  },

  success: {
    color: "green",
    fontWeight: "600",
  },
});