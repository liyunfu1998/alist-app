import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import TabButton from "@/components/TabButton";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";

export default function Layout() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  useEffect(() => {
    AsyncStorage.getItem("userInfo").then((res) => {
      setUserInfo(res ? JSON.parse(res) : null);
    });
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerBackground: () => (
            <BlurView
              intensity={60}
              tint={"light"}
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: "rgba(256,256,256,0.5)",
                },
              ]}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Ionicons
                name="settings"
                size={24}
                color={Colors.primaryFontColor}
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text style={styles.headerTitle}>{userInfo?.username}</Text>
          ),
        }}
      />
      <Tabs>
        <TabSlot />
        <TabList style={[styles.tabList, styles.shadow]}>
          <TabTrigger name="(home)/index" href="/" reset="always" asChild>
            <TabButton icon="folder">文件</TabButton>
          </TabTrigger>
          <TabTrigger name="upload" href="/upload" reset="always" asChild>
            <TouchableOpacity
              style={{
                ...styles.uploadButton,
                ...styles.shadow,
              }}
            >
              <Ionicons name="add" size={50} color="white" />
            </TouchableOpacity>
          </TabTrigger>
          <TabTrigger name="manage" href="/manage" reset="always" asChild>
            <TabButton icon="cloud">管理</TabButton>
          </TabTrigger>
        </TabList>
      </Tabs>
    </>
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
    backgroundColor: Colors.linkColor,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.linkColor,
  },
});
