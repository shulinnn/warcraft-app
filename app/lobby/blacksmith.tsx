import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import appBackground from "../../assets/bg.jpg";
import { Upgrade } from "../../types";
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { MenuButton } from "../../components/MenuButton";
import React from "react";
import { Chip } from "../../components/Chip";

export default function blacksmith() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Upgrade[]);
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
          fetch("http://wbgl.eu/api/v1/upgrades/race/" + raceId)
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
                      rowGap: 16,
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
                  <View
                    style={{ flexDirection: "row", minWidth: "100%", gap: 8 }}
                  >
                    <Chip
                      backgroundColor="#2F95DC"
                      chipText={e.price_gold.toString() + " gold"}
                    />
                    <Chip
                      backgroundColor="#2F95DC"
                      chipText={e.price_wood.toString() + " wood"}
                    />
                    <Chip
                      backgroundColor="#2F95DC"
                      chipText={e.tech.toString() + " tech"}
                    />
                  </View>
                  {e.ability.length >= 0 ? (
                    <View style={{ flexDirection: "column", rowGap: 8 }}>
                      {e.ability.length > 0 ? (
                        e.ability.map((c, x) => (
                          <View
                            key={x}
                            style={{
                              flexWrap: "wrap",
                              flexDirection: "row",
                              rowGap: 16,
                              columnGap: 16,
                              alignItems: "center",
                            }}
                          >
                            <Image
                              width={45}
                              height={45}
                              source={{
                                uri: `http://wbgl.eu/api/v1/assets/${c.icon}`,
                              }}
                            />
                            <Text style={{ color: "#FFF", fontSize: 18 }}>
                              {c.name}
                            </Text>
                            <View style={{ minWidth: "100%" }}>
                              <Text style={{ color: "#FFF" }}>
                                {c.description}
                              </Text>
                            </View>
                          </View>
                        ))
                      ) : (
                        <Text style={{ color: "#FFF" }}>{e.description}</Text>
                      )}
                    </View>
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
    flexDirection: "column",
    rowGap: 16,
    alignItems: "flex-start",
  },
  header: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
});
