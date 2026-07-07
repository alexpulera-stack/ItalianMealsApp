
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { fetchMealById } from "../services/mealsApi";
import React from "react";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoritesContext";

export function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.idMeal;
  const [ingredients, setIngredients] = React.useState<any>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!id) return <Text style={{ padding: 16 }}>Invalid route param</Text>;

  async function loadMeals() {
    const data = await fetchMealById(id);
    setIngredients(data);
  }

  React.useEffect(() => {
    loadMeals();
  }, [id]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: ingredients?.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{ingredients?.strMeal}</Text>
      <Text>{ingredients?.strInstructions}</Text>

      <View style={styles.actionsRow}>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
        <FavoriteButton
          isFavorite={isFavorite(id)}
          onToggle={() => toggleFavorite(id)}
        />
      </View>
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
  title: { fontSize: 22, fontWeight: "700" },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
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