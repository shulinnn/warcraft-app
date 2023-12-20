import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import appBackground from "../../assets/bg.jpg";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ColorTheme } from "../../color-theme";
import { Race, Ability } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuButton } from "../../components/MenuButton";

export default function index() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({} as Race);
  const [raceId, setRaceId] = useState(0);

  useEffect(() => {
    /// on component render/re-render we should get the storage

    const firstLoad = async () => {
      try {
        const savedRaceId = await AsyncStorage.getItem("@raceId");
        const x = Number(savedRaceId);
        setRaceId(x);
      } catch (err) {
        console.error(err);
      }
    };

    firstLoad()
      .catch((e) => {
        console.log("Catched error in FirstLoad()" + e);
      })
      .then(() => {
        if (raceId != 0)
          fetch("http://10.0.0.133:8000/race/" + raceId)
            .then((response) => response.json())
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              console.log("Catched error in Fetch error : " + error);
            })
            .finally(() => {
              setIsLoading(false);
            });
      });
  }, [raceId, setRaceId]);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={appBackground}
          style={styles.imageBg}
          imageStyle={{ opacity: 0.1 }}
        >
          <MenuButton />
          <View style={styles.wrapper}>
            {isLoading ? (
              <ActivityIndicator size={64} color="#2F95DC" />
            ) : (
              <View style={styles.page}>
                <Image
                  style={{ height: 240, width: 240 }}
                  source={{
                    uri: `http://10.0.0.133:8000/assets/${data?.icon}`,
                  }}
                />
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    color: ColorTheme.white,
                  }}
                >
                  {data.name}
                </Text>
                <Image
                  style={{ height: 64, width: 64 }}
                  source={{
                    uri: `http://10.0.0.133:8000/assets/${data.ability.icon}`,
                  }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "500",
                    textTransform: "uppercase",
                    color: ColorTheme.white,
                  }}
                >
                  {data.ability.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: ColorTheme.white,
                    textAlign: "center",
                    paddingHorizontal: 32,
                  }}
                >
                  {data.ability.description}
                </Text>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002650",
  },
  imageBg: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  page: {
    rowGap: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
/* <Pressable
  style={{ position: "absolute", left: 32, top: 32 }}
  onPress={() => nav.dispatch(DrawerActions.openDrawer())}
  >
  <Ionicons name="md-checkmark-circle" size={32} color="green" />
  </Pressable> */
