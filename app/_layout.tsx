import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerShadowVisible: false,
        headerTintColor: "#8deff0",
        contentStyle: {
          backgroundColor: "#6980ab",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
