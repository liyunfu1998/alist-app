import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  // 最大容量，默认值1000调数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  storageBackend: AsyncStorage,

  // 数据过期时间，设置为null则永不过期
  defaultExpires: null,

  // 读写时在内存中缓存数据
  enableCache: true,
});

export default storage;
