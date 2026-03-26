import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f3eadb",
        },
        headerShadowVisible: false,
        headerTintColor: "#2f241b",
        contentStyle: {
          backgroundColor: "#f3eadb",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
    </Stack>
  );
}
