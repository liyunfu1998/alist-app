import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function Breadcrumb(props: any) {
  const { path } = props;
  const pathList = path.split("/");
  const router = useRouter();
  return (
    <BlurView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.replace("/");
        }}
      >
        <Ionicons name="home" size={24} color={Colors.textColorSecond} />
      </TouchableOpacity>
      {pathList.map((item: string, index: number) => (
        <React.Fragment key={index}>
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.replace(
                `/(tabs)/(home)/${encodeURIComponent(
                  `${pathList.slice(0, index + 1).join("/")}`
                )}`
              )
            }
          >
            <Text
              style={{
                color:
                  index === pathList.length - 1
                    ? Colors.textColorSecond
                    : Colors.textPrimaryColor,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
          {index !== pathList.length - 1 && <Text> / </Text>}
        </React.Fragment>
      ))}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
