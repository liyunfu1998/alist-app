import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/api";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import Breadcrumb from "@/components/Breadcrumb";
import { Image } from "react-native";
const NoContent = require("@/assets/images/no-content.png");
const Page = () => {
  const { path } = useLocalSearchParams();
  const [dataList, setDataList] = useState<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchData = async (path: string = "/") => {
    setLoading(true);
    const res = await fetchWithToken("/api/fs/list", {
      method: "POST",
      body: JSON.stringify({
        page: 1,
        password: "",
        path,
        per_page: 0,
        refresh: false,
      }),
    });
    if (res?.data?.content?.length) {
      setDataList(res?.data?.content);
    } else {
      setDataList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(path as string);
  }, []);

  const handleItemClick = (item: any) => {
    if (item?.is_dir) {
      router.push(
        `/(tabs)/(home)/${encodeURIComponent(`${path}/${item?.name}`)}`
      );
    } else {
      router.push(`/player/${encodeURIComponent(`${path}/${item?.name}`)}`);
    }
  };

  return (
    <>
      {dataList?.length ? (
        <>
          <Breadcrumb path={path as string} />
          <View style={styles.container}>
            <FlashList
              onRefresh={() => fetchData(path as string)}
              refreshing={loading}
              data={dataList}
              estimatedItemSize={200}
              ListFooterComponentStyle={{
                paddingBottom: 150,
              }}
              ListHeaderComponentStyle={{
                paddingTop: 10,
              }}
              renderItem={({ item }: { item: any }) => (
                <TouchableOpacity
                  key={item?.name}
                  style={styles.item}
                  onPress={() => handleItemClick(item)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator style={{ marginTop: 100 }} animating={loading} />
          ) : (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <Image
                source={NoContent}
                style={{ width: "100%", height: 500 }}
                resizeMode="contain"
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },
  item: {
    width: "100%",
    height: 88,
    borderRadius: 15,
    justifyContent: "center",
    paddingLeft: 15,
    backgroundColor: Colors.linkColor,
    marginBottom: 15,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
