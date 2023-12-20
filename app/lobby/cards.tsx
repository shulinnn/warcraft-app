import { useEffect, useState } from "react";
import { Card } from "../../types";
import {
  ImageBackground,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { MenuButton } from "../../components/MenuButton";
import appBackground from "../../assets/bg.jpg";
import { Chip } from "../../components/Chip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ColorTheme } from "../../color-theme";

export default function cards() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Card[]);
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
          fetch("http://10.0.0.133:8000/cards/race/" + raceId)
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
          contentContainerStyle={{
            minHeight: "100%",
            rowGap: 22,
            paddingHorizontal: 32,
            justifyContent: "center",
            paddingTop: 128,
            paddingBottom: 32,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={64} color="#2F95DC" />
          ) : (
            data.map((e, i) => (
              <React.Fragment key={i}>
                <View style={styles.page}>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 16,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      height={64}
                      width={64}
                      source={{
                        uri: `http://10.0.0.133:8000/assets/${e.icon}`,
                      }}
                      resizeMethod="resize"
                    />
                    <Text style={{ fontSize: 18, color: "#FFF" }}>
                      {e.name}
                    </Text>
                  </View>
                  <Chip
                    chipText={`${e.times_in_deck} X`}
                    backgroundColor="#2F95DC"
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: ColorTheme.white, fontSize: 14 }}>
                    {e.description}
                  </Text>
                </View>
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
  page: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
});
