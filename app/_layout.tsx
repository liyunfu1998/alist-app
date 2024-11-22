import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="settings"
      >
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
