import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { FavoriteButton } from "../components/FavoriteButton";
import { createSharedStyles } from "../theme/styles";

export function FavoritesScreen({ navigation }: any) {
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const styles = createSharedStyles(theme);

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
      <View style={styles.screen}>
        <Text style={styles.loadingText}>Caricamento preferiti...</Text>
      </View>
    );
  }

  if (!favoriteIds.length) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emptyText}>
          Nessun preferito ancora. Tocca ♡ su un piatto dalla lista.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        I tuoi preferiti
      </Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Pressable
              style={styles.mealInfo}
              onPress={() => navigation.navigate("Details", { idMeal: item.idMeal })}
              accessibilityRole="button"
              accessibilityLabel={`Apri ${item.strMeal}`}
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

const styles = {
  image: {
    width: 55,
    height: 55,
    borderRadius: 8,
    marginRight: 12,
  },
};
