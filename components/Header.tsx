import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={[styles.container, { height: top + 56 }]}>
      <View style={[styles.content, { marginTop: top }]}>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f5f7",
  },
  content: {
    height: 56,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
