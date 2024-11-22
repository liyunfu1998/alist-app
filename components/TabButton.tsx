import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabTriggerSlotProps } from "expo-router/ui";
import { ComponentProps, Ref, forwardRef } from "react";
import { Text, Pressable, View } from "react-native";

type Icon = ComponentProps<typeof FontAwesome>["name"];

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: Icon;
};

const TabButton = forwardRef(
  ({ icon, children, isFocused, ...props }: TabButtonProps, ref: Ref<View>) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        style={[
          {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            padding: 10,
            borderRadius: 15,
          },
          isFocused ? { backgroundColor: "white" } : undefined,
        ]}
      >
        <FontAwesome
          name={icon}
          size={24}
          color={isFocused ? "#e32f45" : "#748c94"}
        />
        <Text
          style={[
            { fontSize: 16 },
            { color: isFocused ? "#e32f45" : "#748c94" },
          ]}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

export default TabButton;
