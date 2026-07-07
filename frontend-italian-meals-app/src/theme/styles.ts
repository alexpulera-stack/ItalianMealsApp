import { StyleSheet } from "react-native";
import { spacing } from "./colors";

export function createSharedStyles(theme: { colors: Record<string, string> }) {
  const colors = theme.colors;

  return StyleSheet.create({
    screen: {
      flex: 1,
      padding: spacing.lg,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
      marginBottom: spacing.lg,
    },
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    buttonsRow: {
      flexDirection: "row",
      marginBottom: spacing.lg,
      gap: spacing.sm,
    },
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    buttonText: {
      fontWeight: "600",
      color: colors.text,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: spacing.sm,
      gap: spacing.sm,
    },
    listItemWide: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      padding: spacing.md,
      backgroundColor: colors.surface,
      gap: spacing.sm,
      flex: 1,
    },
    mealInfo: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: spacing.sm,
    },
    mealName: {
      fontSize: 16,
      color: colors.text,
      flex: 1,
      flexShrink: 1,
    },
    flatListContent: {
      gap: spacing.sm,
    },
    emptyText: {
      fontSize: 16,
      color: colors.muted,
      lineHeight: 24,
    },
    loadingText: {
      fontSize: 16,
      color: colors.muted,
    },
    pressedFeedback: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
  });
}
