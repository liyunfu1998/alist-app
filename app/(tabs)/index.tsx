import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/api";
import { Colors } from "@/constants/Colors";
import { Stack, Tabs, useNavigation, useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

type Props = {};

const Page = (props: Props) => {
  const [path, setPath] = useState<string>("");
  const [dataList, setDataList] = useState<any>(null);
  const router = useRouter();

  const fetchData = async (path: string = "/") => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemClick = (item: any) => {
    if (item?.is_dir) {
      setPath((prevPath) => {
        const currentPath = prevPath + "/" + item?.name;
        fetchData(currentPath);
        return currentPath;
      });
    } else {
      router.push(`/${encodeURIComponent(`${path}/${item?.name}`)}`);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlashList
          data={dataList}
          estimatedItemSize={200}
          ListFooterComponentStyle={{
            paddingBottom: 120,
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
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 15,
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
