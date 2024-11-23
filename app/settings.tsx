import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithToken } from "@/lib/api";
import { hashPwd } from "@/lib/hash";
const FormScreen = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    // 在这里处理表单提交逻辑

    if (url && username && password) {
      const hashedPassword = hashPwd(password);
      await AsyncStorage.setItem("baseUrl", url);
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      const res = await fetchWithToken("/api/auth/login/hash", {
        method: "POST",
        body: JSON.stringify({
          username,
          password: hashedPassword,
        }),
      });
      const token = res?.data?.token;
      if (token) {
        await AsyncStorage.setItem("token", token);
        router.dismissTo("/");
      } else {
        Alert.alert("登录失败");
      }
    } else {
      Alert.alert("请输入完整信息");
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("baseUrl").then((value) => {
      setUrl(value || "");
    });
    AsyncStorage.getItem("username").then((value) => {
      setUsername(value || "");
    });
    AsyncStorage.getItem("password").then((value) => {
      setPassword(value || "");
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>网址</Text>
      <TextInput
        style={styles.input}
        placeholder="网址: http://example.com"
        value={url}
        onChangeText={setUrl}
      />
      <Text style={styles.label}>用户名</Text>
      <TextInput
        style={styles.input}
        placeholder="用户名: admin"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>密码</Text>
      <TextInput
        style={styles.input}
        placeholder="密码: 123456"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>提交</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 30,
    gap: 10,
    paddingTop: 88,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    color: "#373737",
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    outline: "none",
    backgroundColor: "#FFFFFF",
    paddingLeft: 20,
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: Colors.linkColor,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default FormScreen;
