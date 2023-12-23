import { Fragment, useEffect, useState } from "react";
import { Creep, Hero } from "../../../types";
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
import { ColorTheme } from "../../../color-theme";

export default function hero() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({} as Creep);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetch("http://wbgl.eu/api/v1/creep/" + id)
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
            paddingBottom : 64
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
                    uri: `http://wbgl.eu/api/v1/assets/${data.icon}`,
                  }}
                />
                <Text style={styles.header}>{data.name}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  columnGap: 8,
                  rowGap: 8,
                  flexGrow: 0,
                }}
              >
                <Chip
                  chipText={`${data.damage} damage`}
                  backgroundColor="#2F95DC"
                />

                <Chip
                  chipText={`${data.health} health`}
                  backgroundColor="#2F95DC"
                />

                <Chip
                  chipText={`${data.level} level`}
                  backgroundColor="#2F95DC"
                />

                <Chip
                  chipText={`${data.unit_type}`}
                  backgroundColor="#2F95DC"
                />

                <Chip
                  chipText={`${data.attack_type}`}
                  backgroundColor="#2F95DC"
                />
              </View>
              <Text style={{ color: "#FFF", fontSize: 24 }}>Dropy</Text>
              <View style={{ flexDirection: "column", rowGap : 32 }}>
                {data.item.map((e, i) => (
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
                            uri: `http://wbgl.eu/api/v1/assets/${e.icon}`,
                          }}
                          resizeMethod="resize"
                        />
                        <Text style={{ fontSize: 18, color: "#FFF" }}>
                          {e.name}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", columnGap: 8 }}>
                      <Chip
                        chipText={`${e.price_gold} gold`}
                        backgroundColor="#2F95DC"
                      />
                      <Chip
                        chipText={`${e.price_wood} wood`}
                        backgroundColor="#2F95DC"
                      />
                      <Chip chipText={`${e.type}`} backgroundColor="#2F95DC" />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: ColorTheme.white, fontSize: 14 }}>
                        {e.description}
                      </Text>
                    </View>
                  </React.Fragment>
                ))}
              </View>
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
