import { useEffect, useState } from "react";
import { Creep, Item } from "../../types";
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
import React from "react";
import { ColorTheme } from "../../color-theme";
import { router } from "expo-router";

export default function shop() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Creep[]);
  const [raceId, setRaceId] = useState(0);

  useEffect(() => {
    fetch("http://10.0.0.133:8000/creeps")
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
  }, []);

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
              <Pressable key={i} onPress={() => router.push("/lobby/creep/" + e.id)}>
                <View style={styles.page}>
                  <View
                    style={{
                      flexDirection: "row",
                      columnGap: 16,
                      alignItems: "center",
                      paddingBottom: 32,
                    }}
                  >
                    <Image
                      height={64}
                      width={64}
                      source={{
                        uri: `http://10.0.0.133:8000/assets/${e.icon}`,
                      }}
                      style={{ resizeMode: "contain" }}
                    />
                    <Text style={{ fontSize: 18, color: "#FFF" }}>
                      {e.name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    columnGap: 8,
                    rowGap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    chipText={`${e.damage} damage`}
                    backgroundColor="#2F95DC"
                  />

                  <Chip
                    chipText={`${e.health} health`}
                    backgroundColor="#2F95DC"
                  />

                  <Chip
                    chipText={`${e.level} level`}
                    backgroundColor="#2F95DC"
                  />

                  <Chip chipText={`${e.unit_type}`} backgroundColor="#2F95DC" />

                  <Chip
                    chipText={`${e.attack_type}`}
                    backgroundColor="#2F95DC"
                  />
                </View>
              </Pressable>
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
