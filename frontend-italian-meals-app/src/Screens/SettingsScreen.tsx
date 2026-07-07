import React from "react";
import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/styles";
import { useAuth } from "../context/AuthContext";

export function SettingsScreen({ navigation }: any) {
  const { favoriteIds } = useFavorites();
  const { theme, themeMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
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
    profileRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
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

  async function handleLogout() {
    await logout();
    navigation.replace("Login");
  }

  return (
    <View style={sharedStyles.screen}>
      <Text style={sharedStyles.title} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        Impostazioni
      </Text>

      <View style={localStyles.settingsCard}>
        {user ? (
          <View style={localStyles.profileRow}>
            <Image source={{ uri: user.avatarUri }} style={localStyles.avatar} />
            <View>
              <Text style={localStyles.settingLabel}>{user.name}</Text>
              <Text style={localStyles.settingText}>{user.email}</Text>
            </View>
          </View>
        ) : null}

        <View style={sharedStyles.rowCenter}>
          <Text style={localStyles.settingLabel}>Tema scuro</Text>
          <Switch value={themeMode === "dark"} onValueChange={toggleTheme} />
        </View>

        <Text style={localStyles.settingText}>Preferiti salvati: {favoriteIds.length}</Text>

        <Pressable style={sharedStyles.button} onPress={handleLogout} accessibilityRole="button" accessibilityLabel="Esci dall'account">
          <Text style={sharedStyles.buttonText}>Esci</Text>
        </Pressable>

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
