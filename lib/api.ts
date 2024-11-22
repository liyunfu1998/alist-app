import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchWithToken = async (endpoint: string, options: any = {}) => {
  console.log("endpoint", endpoint);
  const baseUrl = await AsyncStorage.getItem("baseUrl");
  const token = await AsyncStorage.getItem("token");

  const fullUrl = `${baseUrl}${endpoint}`;

  const defaultOptions: any = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token && endpoint !== "/api/auth/login/hash") {
    defaultOptions.headers.Authorization = `${token}`;
  }
  const response = await fetch(fullUrl, {
    ...defaultOptions,
    ...options,
  });

  const data = await response.json();
  console.log("data", data);
  if (!response.ok) {
    throw new Error(data.message || "请求失败");
  }

  return data;
};
