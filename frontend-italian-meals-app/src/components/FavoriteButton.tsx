import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const { theme } = useTheme();
  const styles = React.useMemo(() => StyleSheet.create({
    button: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 8,
      width: 42,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    icon: {
      fontSize: 22,
      color: theme.colors.text,
    },
  }), [theme]);

  return (
    <Pressable
      style={styles.button}
      onPress={onToggle}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      <Text style={styles.icon}>{isFavorite ? "♥" : "♡"}</Text>
    </Pressable>
  );
}
