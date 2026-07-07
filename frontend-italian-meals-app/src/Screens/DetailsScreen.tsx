
import { Pressable, Text, View, Image } from "react-native";
import { fetchMealById } from "../services/mealsApi";
import React from "react";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/styles";

export function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.idMeal;
  const [ingredients, setIngredients] = React.useState<any>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);

  if (!id) return <Text style={styles.emptyText}>Invalid route param</Text>;

  async function loadMeals() {
    const data = await fetchMealById(id);
    setIngredients(data);
  }

  React.useEffect(() => {
    loadMeals();
  }, [id]);

  return (
    <View style={styles.screen}>
      <Image source={{ uri: ingredients?.strMealThumb }} style={detailStyles.image} />
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        {ingredients?.strMeal}
      </Text>
      <Text style={styles.emptyText}>{ingredients?.strInstructions}</Text>

      <View style={styles.rowCenter}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Torna indietro"
        >
          <Text style={styles.buttonText}>Torna indietro</Text>
        </Pressable>
        <FavoriteButton
          isFavorite={isFavorite(id)}
          onToggle={() => toggleFavorite(id)}
        />
      </View>
    </View>
  );
}


const detailStyles = {
  image: {
    width: "100%" as const,
    height: 220,
    borderRadius: 12,
    resizeMode: "cover" as const,
  },
};