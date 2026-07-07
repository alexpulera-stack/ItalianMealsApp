import React from "react";
import { Pressable, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "./src/Screens/HomeScreen";
import { DetailsScreen } from "./src/Screens/DetailsScreen";
import { FavoritesScreen } from "./src/Screens/FavoritesScreen";
import { SettingsScreen } from "./src/Screens/SettingsScreen";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { ThemeProvider } from "./src/context/ThemeContext";

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
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: "Piatti italiani",
                headerRight: () => (
                  <React.Fragment>
                    <Pressable onPress={() => navigation.navigate("Settings")} style={{ marginRight: 10 }}>
                      <Text style={{ fontSize: 18 }}>⚙️</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("Favorites")}>
                      <Text style={{ fontSize: 22 }}>♡</Text>
                    </Pressable>
                  </React.Fragment>
                ),
              })}
            />

            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}