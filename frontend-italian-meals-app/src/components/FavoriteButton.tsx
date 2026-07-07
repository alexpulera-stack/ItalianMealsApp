import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onToggle} hitSlop={8}>
      <Text style={styles.icon}>{isFavorite ? "♥" : "♡"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  icon: {
    fontSize: 22,
  },
});
