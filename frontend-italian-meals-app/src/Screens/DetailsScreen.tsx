
import { Pressable, Text, View, Image } from "react-native";
import { fetchMealById } from "../services/mealsApi";
import React from "react";
import { FavoriteButton } from "../components/FavoriteButton";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/styles";

export function DetailsScreen({ navigation, route }: any) {
  const id = route.params?.idMeal;
  const [meal, setMeal] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);

  async function loadMeal() {
    if (!id) {
      setError("Parametro di navigazione non valido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await fetchMealById(id);
      if (!data) {
        setError("Piatto non trovato");
        setMeal(null);
      } else {
        setMeal(data);
      }
    } catch (e: any) {
      setError(e.message || "Errore di rete");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void loadMeal();
  }, [id]);

  if (!id) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emptyText}>Parametro di navigazione non valido</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text style={styles.loadingText}>Caricamento dettaglio...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emptyText}>{error}</Text>
        <Pressable style={styles.button} onPress={() => void loadMeal()} accessibilityRole="button" accessibilityLabel="Riprova il dettaglio">
          <Text style={styles.buttonText}>Riprova</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Image source={{ uri: meal?.strMealThumb }} style={detailStyles.image} />
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        {meal?.strMeal}
      </Text>
      <Text style={styles.emptyText}>{meal?.strInstructions}</Text>

      <View style={styles.rowCenter}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Torna indietro"
        >
          <Text style={styles.buttonText}>Torna indietro</Text>
        </Pressable>
        <FavoriteButton isFavorite={isFavorite(id)} onToggle={() => toggleFavorite(id)} />
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