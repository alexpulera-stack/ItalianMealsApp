import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { fetchItalianMeals } from "../services/mealsApi";

export function HomeScreen({ navigation }: any) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <FlatList
        data={meals}
        keyExtractor={(item: any) => item.idMeal}
        renderItem={({ item }: any) => (
          <Pressable
            style={styles.listItem}
            onPress={() =>
              navigation.navigate("Details", { idMeal: item.idMeal })
            }
          ><Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text>{item.strMeal}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: "cover",
  },
  listItem: {
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 12,
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