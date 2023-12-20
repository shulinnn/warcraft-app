import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import PagerView from "react-native-pager-view";
import appBackground from "../assets/bg.jpg";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ColorTheme } from "../color-theme";
import { Race } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Race[]);

  const createAsyncStorage = async (raceId: number) => {
    try {
      await AsyncStorage.setItem("@raceId", raceId.toString());
    } catch (err) {
      console.error(`createAsyncStorage : ${err}`);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetch("http://10.0.0.133:8000/races")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={appBackground}
          style={styles.imageBg}
          imageStyle={{ opacity: 0.1 }}
        >
          <PagerView style={styles.wrapper}>
            {isLoading ? (
              <ActivityIndicator size={64} color="#2F95DC" />
            ) : (
              data.map((e, i) => {
                return (
                  <View style={styles.page} key={i}>
                    <Image
                      style={{ height: 240, width: 240 }}
                      source={{
                        uri: `http://10.0.0.133:8000/assets/${e.icon}`,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        color: ColorTheme.white,
                      }}
                    >
                      {e.name}
                    </Text>
                    <Image
                      style={{ height: 64, width: 64 }}
                      source={{
                        uri: `http://10.0.0.133:8000/assets/${e.ability.icon}`,
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
                      {e.ability.name}
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
                      {e.ability.description}
                    </Text>
                    <Pressable
                      style={{
                        marginTop: 32,
                      }}
                      onPress={async () => {
                        await createAsyncStorage(e.id);
                        router.push({
                          pathname: "lobby",
                        });
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: ColorTheme.secondary,
                          paddingVertical: 8,
                          paddingHorizontal: 124,
                          borderRadius: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: ColorTheme.white,
                            fontWeight: "400",
                          }}
                        >
                          Zvolit rasu
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                );
              })
            )}
          </PagerView>
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
