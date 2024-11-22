import { useRouter } from "expo-router";
import { View, Text, Button } from "react-native";

export default function Settings() {
  const router = useRouter();
  return (
    <View>
      <Text>设置</Text>
      <Button title="返回" onPress={() => router.back()} />
    </View>
  );
}
