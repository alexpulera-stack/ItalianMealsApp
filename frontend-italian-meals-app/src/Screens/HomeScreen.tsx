
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";
import { loadFavoriteIds, saveFavoriteIds } from "../services/storage";
import { FavoriteButton } from "../components/FavoriteButton";

export function HomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

  async function loadFavorites() {
    const storedFavorites = await loadFavoriteIds();
    setFavorites(storedFavorites);
  }

  useEffect(() => {
    loadMeals();
    loadFavorites();
  }, []);

  function toggleFavorite(id: string) {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.includes(id);
      const nextFavorites = isFavorite
        ? currentFavorites.filter((fav) => fav !== id)
        : [...currentFavorites, id];

      void saveFavoriteIds(nextFavorites);
      return nextFavorites;
    });
  }

  const displayedMeals = showFavorites
    ? meals.filter((meal: any) => favorites.includes(meal.idMeal))
    : meals;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            Preferiti ({favorites.length})
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={displayedMeals}
        keyExtractor={(item: any) => item.idMeal}
        renderItem={({ item }: any) => (
          <View style={styles.listItem}>
            <Pressable
              style={styles.mealInfo}
              onPress={() =>
                navigation.navigate("Details", {
                  idMeal: item.idMeal,
                })
              }
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.image}
              />

              <Text style={styles.mealName}>{item.strMeal}</Text>
            </Pressable>

            <FavoriteButton
              isFavorite={favorites.includes(item.idMeal)}
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  buttonsRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },

  buttonText: {
    fontWeight: "600",
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