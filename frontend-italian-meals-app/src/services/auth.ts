import AsyncStorage from "@react-native-async-storage/async-storage";

export type AuthUser = {
  email: string;
  password: string;
  name: string;
  avatarUri: string;
};

export const AUTH_SESSION_KEY = "app:v1:auth";

export const MOCK_USERS: AuthUser[] = [
  {
    email: "mario.rossi@student.it",
    password: "React2026!",
    name: "Mario Rossi",
    avatarUri: "https://picsum.photos/seed/mario-rossi/128",
  },
  {
    email: "giulia.bianchi@student.it",
    password: "Expo2026!",
    name: "Giulia Bianchi",
    avatarUri: "https://picsum.photos/seed/giulia-bianchi/128",
  },
  {
    email: "luca.verdi@student.it",
    password: "Mobile2026!",
    name: "Luca Verdi",
    avatarUri: "https://picsum.photos/seed/luca-verdi/128",
  },
];

export function validateLogin(email: string, password: string) {
  return MOCK_USERS.find(
    (user) => user.email === email.trim() && user.password === password
  );
}

export async function loadStoredSession(): Promise<AuthUser | null> {
  try {
    const raw = await AsyncStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export async function saveStoredSession(user: AuthUser) {
  await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
}

export async function clearStoredSession() {
  await AsyncStorage.removeItem(AUTH_SESSION_KEY);
}
