import { useEffect, useState } from "react";
import { Item, Unit } from "../../types";
import {
  ImageBackground,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { MenuButton } from "../../components/MenuButton";
import appBackground from "../../assets/bg.jpg";
import { Chip } from "../../components/Chip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ColorTheme } from "../../color-theme";
import { router } from "expo-router";

export default function units() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Unit[]);
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
          fetch("http://wbgl.eu/api/v1/units/" + raceId)
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
                <Pressable onPress={() => router.push("/lobby/unit/" + e.id)}>
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
                          uri: `http://wbgl.eu/api/v1/assets/${e.icon}`,
                        }}
                        resizeMethod="resize"
                      />
                      <Text style={{ fontSize: 18, color: "#FFF" }}>
                        {e.name}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    chipText={`${e.priceGold} gold`}
                    backgroundColor="#2F95DC"
                  />
                  <Chip
                    chipText={`${e.priceWood} wood`}
                    backgroundColor="#2F95DC"
                  />
                  <Chip
                    chipText={`${e.attack_type}`}
                    backgroundColor="#2F95DC"
                  />
                  <Chip chipText={`${e.unit_type}`} backgroundColor="#2F95DC" />
                  <Chip
                    chipText={`${e.movement} pohyb`}
                    backgroundColor="#2F95DC"
                  />
                  <Chip
                    chipText={`${e.damage} DMG`}
                    backgroundColor="#2F95DC"
                  />
                  <Chip chipText={`${e.health} HP`} backgroundColor="#2F95DC" />
                  <Chip
                    chipText={`${e.range} RANGE`}
                    backgroundColor="#2F95DC"
                  />
                  <Chip chipText={`${e.tech} TECH`} backgroundColor="#2F95DC" />
                  {e.special_unit ? (
                    <Chip chipText={`Special unit`} backgroundColor="#2F95DC" />
                  ) : null}
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
