import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./src/Screens/HomeScreen";
import { DetailsScreen } from "./src/Screens/DetailsScreen";
import { FavoritesScreen } from "./src/Screens/FavoritesScreen";
import { FavoritesProvider } from "./src/context/FavoritesContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: ["myapp://"],
    config: {
      screens: {
        Home: "home",
        Details: "details/:id",
      },
    },
  };

  return (
    <FavoritesProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: "Piatti italiani",
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate("Favorites")}>
                  <Text style={{ fontSize: 22 }}>♡</Text>
                </Pressable>
              ),
            })}
          />

          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}