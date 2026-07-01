
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

export function HomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Preferiti
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

  useEffect(() => {
    loadMeals();
  }, []);

  function toggleFavorite(id: string) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
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

            <Pressable
              style={styles.heartButton}
              onPress={() => toggleFavorite(item.idMeal)}
            >
              <Text style={{ fontSize: 22 }}>
                {favorites.includes(item.idMeal) ? "❤️" : "🤍"}
              </Text>
            </Pressable>
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

  heartButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: 42,
    alignItems: "center",
  },
});