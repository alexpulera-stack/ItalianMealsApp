
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_KEY = "app:v1:favs";
export const THEME_KEY = "app:v1:theme";

// Carica i preferiti
export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);

    if (!data) {
      return [];
    }

    const parsed = JSON.parse(data);

    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }

    return [];
  } catch (error) {
    return [];
  }
}

// Salva i preferiti
export async function saveFavoriteIds(ids: string[]) {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (error) {
    console.log("Errore salvataggio", error);
  }
}

export async function loadThemeMode(): Promise<"light" | "dark" | null> {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    if (value === "dark" || value === "light") {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function saveThemeMode(mode: "light" | "dark") {
  try {
    await AsyncStorage.setItem(THEME_KEY, mode);
  } catch (error) {
    console.log("Errore salvataggio tema", error);
  }
}