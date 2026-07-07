import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/styles";

export function SettingsScreen({ navigation }: any) {
  const { favoriteIds } = useFavorites();
  const { theme, themeMode, toggleTheme } = useTheme();
  const sharedStyles = createSharedStyles(theme);
  const localStyles = StyleSheet.create({
    settingsCard: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      gap: 12,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },
    settingText: {
      fontSize: 14,
      color: theme.colors.muted,
    },
  });

  return (
    <View style={sharedStyles.screen}>
      <Text style={sharedStyles.title} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        Impostazioni
      </Text>

      <View style={localStyles.settingsCard}>
        <View style={sharedStyles.rowCenter}>
          <Text style={localStyles.settingLabel}>Tema scuro</Text>
          <Switch value={themeMode === "dark"} onValueChange={toggleTheme} />
        </View>

        <Text style={localStyles.settingText}>Preferiti salvati: {favoriteIds.length}</Text>

        <Pressable
          style={sharedStyles.button}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Torna alla lista"
        >
          <Text style={sharedStyles.buttonText}>Torna indietro</Text>
        </Pressable>
      </View>
    </View>
  );
}
