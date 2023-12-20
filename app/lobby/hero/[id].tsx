import { Fragment, useEffect, useState } from "react";
import { Hero } from "../../../types";
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
  const [data, setData] = useState({} as Hero);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetch("http://10.0.0.133:8000/hero/" + id)
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
            justifyContent : "center",
            flexGrow: 1,
            rowGap: 32,
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
                  flex: 1,
                  flexDirection: "row",
                  columnGap: 8,
                  flexGrow: 0,
                }}
              >
                <Chip backgroundColor="#2F95DC" chipText={data.attack_type} />
                <Chip
                  backgroundColor="#E6A201"
                  chipText={data.cost.toString() + " gold"}
                />
              </View>
              {data.ability.map((e, i) => (
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
              ))}
            </React.Fragment>
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
