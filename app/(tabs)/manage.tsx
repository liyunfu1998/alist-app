import { View, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
export default function Manage() {
  const headerHeight = useHeaderHeight();
  return (
    <View style={{ paddingTop: headerHeight }}>
      <Text>存储</Text>
    </View>
  );
}
