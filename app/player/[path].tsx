import { fetchWithToken } from "@/lib/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { VideoView } from "expo-video";

import Player from "@/components/Player";
export default function Detail() {
  const { path } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const fetchData = async (path: string) => {
    const res = await fetchWithToken("/api/fs/get", {
      method: "POST",
      body: JSON.stringify({
        path,
      }),
    });
    if (res?.data) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    fetchData(path as string);
  }, [path]);

  return <Player url={data?.raw_url} />;
}
