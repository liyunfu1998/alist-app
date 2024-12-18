import { useRouter, Stack } from "expo-router";
import Header from "@/components/Header";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithToken } from "@/lib/api";
export default function RootLayout() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const init = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      Promise.all([
        fetchWithToken("/api/me", {
          method: "GET",
        }).then((res) => {
          if (res?.data) {
            setUserInfo(res?.data);
            AsyncStorage.setItem("userInfo", JSON.stringify(res?.data));
          }
        }),
      ]);
    }
    if (!token) {
      router.replace("/settings");
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Stack initialRouteName="settings">
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
            presentation: "modal",
            headerTitle: "设置",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.mainBgColor,
            },
            headerRight: () => (
              <>
                {router.canGoBack() && (
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                      borderRadius: 20,
                      padding: 4,
                    }}
                  >
                    <Ionicons
                      name="close-outline"
                      size={24}
                      color={Colors.primaryFontColor}
                    />
                  </TouchableOpacity>
                )}
              </>
            ),
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="player/[path]"
          options={{
            title: "详情",
          }}
        />
      </Stack>
    </>
  );
}
