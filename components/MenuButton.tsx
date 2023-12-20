import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

/**
 * A custom menu button component.
 * @returns {JSX.Element} - The rendered menu button component.
 */
export const MenuButton = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        position: "absolute",
        left: 32,
        top: 32,
        backgroundColor: "#FFF",
        borderRadius: 100,
        padding: 8,
        zIndex: 100,
      }}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Feather name="menu" size={24} color="black" />
    </Pressable>
  );
};
