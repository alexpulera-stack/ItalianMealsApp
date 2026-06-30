
import { Pressable, StyleSheet, Text, View, Image} from "react-native";
import { fetchMealById } from "../services/mealsApi";
import React, { useEffect } from "react";




export function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.idMeal;
  const [ingredients, setIngredients] = React.useState<any>(null);
  if (!id) return <Text style={{ padding: 16 }}>Invalid route param</Text>;

      console.log("id", id);
  
  async function loadMeals() {
      const data = await fetchMealById(id);
      setIngredients(data); 
      console.log("data", data);
  }

  React.useEffect(() => {
    loadMeals();
  }, []);

  return (

    <View style={styles.container}>
      <Image source={{ uri: ingredients?.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{ingredients?.strMeal}</Text>
      <Text>{ingredients?.strInstructions}</Text>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    resizeMode: "cover",
  },
  listItem: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  title: { fontSize: 22, fontWeight: "700" },
  button: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  buttonText: { fontWeight: "600" },
});