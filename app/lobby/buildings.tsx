import { useEffect, useState } from "react";
import { Building } from "../../types";
import { router, useNavigation } from "expo-router";
import appBackground from "../../assets/bg.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { MenuButton } from "../../components/MenuButton";
import React from "react";
import { Chip } from "../../components/Chip";
import { ColorTheme } from "../../color-theme";

export default function buildings() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Building[]);
  const [raceId, setRaceId] = useState(0);

  useEffect(() => {
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
          fetch("http://wbgl.eu/api/v1/buildings/race/" + raceId)
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
    <View style={styles.container}>
      <ImageBackground
        source={appBackground}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.1 }}
      >
        <MenuButton />
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={{
            justifyContent: "center",
            flexGrow: 1,
            rowGap: 32,
            paddingTop: 128,
            paddingBottom: 64,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={64} color="#2F95DC" />
          ) : (
            data.map((e, i) => (
              <React.Fragment key={i}>
                <View style={styles.page}>
                  <Image
                    style={{ height: 64, width: 64 }}
                    source={{
                      uri: `http://wbgl.eu/api/v1/assets/${e.icon}`,
                    }}
                  />
                  <Text style={styles.header}>{e.name}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    columnGap: 8,
                    flexGrow: 0,
                  }}
                >
                  <Chip chipText="1 gold" backgroundColor="#2F95DC" />
                  <Chip chipText="1 wood" backgroundColor="#2F95DC" />
                </View>
                <Text style={{ color: ColorTheme.white }}>{e.description}</Text>
              </React.Fragment>
            ))
          )}
        </ScrollView>
      </ImageBackground>
    </View>
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
    paddingHorizontal: 32,
  },
  page: {
    gap: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
});
