import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, Platform } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export default function VideoScreen(props: { url: string }) {
  const player = useVideoPlayer(props.url, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={true}
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f7f7f7",
  },
  video: {
    width: width - 20,
    height: ((width - 20) * 9) / 16,
    ...Platform.select({
      web: {
        width: 900,
        height: (900 * 9) / 16,
      },
    }),
    backgroundColor: "#000",
  },
  controlsContainer: {
    padding: 10,
  },
});
