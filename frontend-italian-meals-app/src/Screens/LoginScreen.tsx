import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createSharedStyles } from "../theme/styles";
import { useTheme } from "../context/ThemeContext";

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, setError } = useAuth();
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError("Inserisci email e password");
      return;
    }

    const ok = await login(email, password);
    if (ok) {
      navigation.replace("Home");
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={1.4}>Login</Text>
      <TextInput
        style={[localStyles.input, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface, color: theme.colors.text }]}
        placeholder="Email"
        placeholderTextColor={theme.colors.muted}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={[localStyles.input, { borderColor: theme.colors.border, backgroundColor: theme.colors.surface, color: theme.colors.text }]}
        placeholder="Password"
        placeholderTextColor={theme.colors.muted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.emptyText}>{error}</Text> : null}
      <Text style={styles.emptyText}>Utenti mock: mario.rossi@student.it / React2026!</Text>
      <Pressable style={styles.button} onPress={() => void handleLogin()} accessibilityRole="button" accessibilityLabel="Accedi">
        <Text style={styles.buttonText}>Accedi</Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
});
