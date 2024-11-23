import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/api";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator } from "react-native";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {};
const NoContent = require("@/assets/images/no-content.png");
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const Page = (props: Props) => {
  const [dataList, setDataList] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
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
    fetchData();
  }, []);

  const handleItemClick = (item: any) => {
    if (item?.is_dir) {
      router.push(`/(tabs)/(home)/${encodeURIComponent(`/${item?.name}`)}`);
    } else {
      router.push(`/player/${encodeURIComponent(`/${item?.name}`)}`);
    }
  };

  return (
    <>
      {dataList?.length ? (
        <>
          <Breadcrumb path={"/"} />
          {loading && dataList?.length && (
            <ActivityIndicator animating={loading} />
          )}
          <View style={styles.container}>
            <FlashList
              onRefresh={() => fetchData()}
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
                <ShimmerPlaceholder
                  visible={!loading}
                  width={width - 30}
                  height={88}
                  shimmerStyle={{
                    borderRadius: 15,
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity
                    key={item?.name}
                    style={styles.item}
                    onPress={() => handleItemClick(item)}
                  >
                    <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
                </ShimmerPlaceholder>
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
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#B0D6C9",
                  fontWeight: "bold",
                }}
              >
                文件去火星啦
              </Text>
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
