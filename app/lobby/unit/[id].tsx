import { Fragment, useEffect, useState } from "react";
import { Unit } from "../../../types";
import { useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { MenuButton } from "../../../components/MenuButton";
import React from "react";
import appBackground from "../../../assets/bg.jpg";
import { Chip } from "../../../components/Chip";

export default function hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({} as Unit);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (isLoading)
      fetch("http://10.0.0.133:8000/unit/" + id)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.log("FETCH ERROR : " + error);
        })
        .finally(() => {
          setIsLoading(false);
        });
  });

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
            flexGrow: 1,
            rowGap: 32,
            paddingTop: 128,
            paddingBottom: 64,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={64} color="#2F95DC" />
          ) : (
            <React.Fragment>
              <View style={styles.page}>
                <Image
                  style={{ height: 64, width: 64 }}
                  source={{
                    uri: `http://10.0.0.133:8000/assets/${data.icon}`,
                  }}
                />
                <Text style={styles.header}>{data.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  chipText={`${data.priceGold} gold`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.priceWood} wood`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.attack_type}`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.unit_type}`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.movement} pohyb`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.damage} DMG`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.health} HP`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.range} RANGE`}
                  backgroundColor="#2F95DC"
                />
                <Chip
                  chipText={`${data.tech} TECH`}
                  backgroundColor="#2F95DC"
                />
                {data.special_unit ? (
                  <Chip chipText={`Special unit`} backgroundColor="#2F95DC" />
                ) : null}
              </View>
            </React.Fragment>
          )}
          {data.ability
            ? data.ability.map((e, i) => (
                <Fragment key={i}>
                  <Text style={{ fontSize: 24, color: "#FFF" }}>
                    Schopnosti
                  </Text>
                  <View key={i} style={{ gap: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 32,
                      }}
                    >
                      <Image
                        style={{ height: 64, width: 64 }}
                        source={{
                          uri: `http://10.0.0.133:8000/assets/${e.icon}`,
                        }}
                      />
                      <Text style={styles.header}>{e.name}</Text>
                    </View>
                    <Text
                      style={{ color: "#FFF", fontSize: 16, fontWeight: "400" }}
                    >
                      {e.description}
                    </Text>
                  </View>
                </Fragment>
              ))
            : null}

          <Text style={{ fontSize: 24, color: "#FFF" }}>
            Stavitelné v budovách
          </Text>
          {data.ability
            ? data.building.map((e, i) => (
                <>
                  <View key={i} style={{ gap: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 32,
                      }}
                    >
                      <Image
                        style={{ height: 64, width: 64 }}
                        source={{
                          uri: `http://10.0.0.133:8000/assets/${e.icon}`,
                        }}
                      />
                      <Text style={styles.header}>{e.name}</Text>
                    </View>
                  </View>
                </>
              ))
            : null}
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 32,
  },
  header: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
});
