import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { StyleSheet, TouchableOpacity } from "react-native";
import TabButton from "@/components/TabButton";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.tabList, styles.shadow]}>
        <TabTrigger name="index" href="/" asChild>
          <TabButton icon="folder">文件</TabButton>
        </TabTrigger>
        <TabTrigger name="upload" href="/upload" asChild>
          <TouchableOpacity
            style={{
              ...styles.uploadButton,
              ...styles.shadow,
            }}
          >
            <Ionicons name="add" size={50} color="white" />
          </TouchableOpacity>
        </TabTrigger>
        <TabTrigger name="manage" href="/manage" asChild>
          <TabButton icon="cloud">管理</TabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 90,
  },
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  uploadButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e32f45",
  },
});
