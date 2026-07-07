
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/styles";

export function HomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const styles = createSharedStyles(theme);

  async function loadMeals() {
    try {
      setLoading(true);
      const data = await fetchItalianMeals();
      setMeals(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  const displayedMeals = showFavorites
    ? meals.filter((meal: any) => favoriteIds.includes(meal.idMeal))
    : meals;

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.loadingText}>Caricamento...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emptyText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        {showFavorites ? "I tuoi preferiti" : "Piatti italiani"}
      </Text>

      <View style={styles.buttonsRow}>
        <Pressable
          style={styles.button}
          onPress={() => setShowFavorites(false)}
        >
          <Text style={styles.buttonText}>Lista</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setShowFavorites(true)}
        >
          <Text style={styles.buttonText}>
            Preferiti ({favoriteIds.length})
          </Text>
        </Pressable>
      </View>

      <FlatList
        key={isWide ? "wide" : "narrow"}
        data={displayedMeals}
        numColumns={isWide ? 2 : 1}
        columnWrapperStyle={isWide ? styles.flatListContent : undefined}
        contentContainerStyle={styles.flatListContent}
        keyExtractor={(item: any) => item.idMeal}
        renderItem={({ item }: any) => (
          <View style={isWide ? styles.listItemWide : styles.listItem}>
            <Pressable
              style={styles.mealInfo}
              onPress={() =>
                navigation.navigate("Details", {
                  idMeal: item.idMeal,
                })
              }
              accessibilityRole="button"
              accessibilityLabel={`Apri ${item.strMeal}`}
              android_ripple={{ color: theme.colors.primary }}
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.image}
              />

              <Text style={styles.mealName} numberOfLines={2}>
                {item.strMeal}
              </Text>
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