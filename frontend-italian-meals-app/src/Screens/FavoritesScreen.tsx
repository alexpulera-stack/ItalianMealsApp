import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { useFavorites } from "../context/FavoritesContext";
import { FavoriteButton } from "../components/FavoriteButton";

export function FavoritesScreen({ navigation }: any) {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavoritesMeals() {
      try {
        setLoading(true);
        const allMeals = await fetchItalianMeals();
        const filteredMeals = allMeals.filter((meal: any) => favoriteIds.includes(meal.idMeal));
        setMeals(filteredMeals);
      } finally {
        setLoading(false);
      }
    }

    loadFavoritesMeals();
  }, [favoriteIds]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Caricamento preferiti...</Text>
      </View>
    );
  }

  if (!favoriteIds.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Nessun preferito ancora. Tocca ♡ su un piatto dalla lista.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I tuoi preferiti</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Pressable
              style={styles.mealInfo}
              onPress={() => navigation.navigate("Details", { idMeal: item.idMeal })}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.mealName}>{item.strMeal}</Text>
            </Pressable>

            <FavoriteButton
              isFavorite={isFavorite(item.idMeal)}
              onToggle={() => toggleFavorite(item.idMeal)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  mealInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 8,
    marginRight: 12,
  },
  mealName: {
    fontSize: 16,
    flex: 1,
  },
});
