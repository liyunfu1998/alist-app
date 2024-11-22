import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 375;

export const px2dp = (px: number) => {
  const dp = px * scale;
  // 可以设置最大最小值，避免在特大或特小屏幕上变形
  return Math.min(Math.max(dp, px * 0.8), px * 1.2);
};
