import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import appBackground from "../../assets/bg.jpg";
import React, { useEffect, useState } from "react";
import { Hero } from "../../types";
import { router, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuButton } from "../../components/MenuButton";
import { Chip } from "../../components/Chip";

export default function tavern() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Hero[]);

  useEffect(() => {
    fetch("http://10.0.0.133:8000/heroes/race/neutral")
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
                <Pressable onPress={() => router.push(`/lobby/hero/${e.id}`)}>
                  <View style={styles.page}>
                    <Image
                      style={{ height: 64, width: 64 }}
                      source={{
                        uri: `http://10.0.0.133:8000/assets/${e.icon}`,
                      }}
                    />
                    <Text style={styles.header}>{e.name}</Text>
                  </View>
                </Pressable>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    columnGap: 8,
                    flexGrow: 0,
                  }}
                >
                  <Chip backgroundColor="#2F95DC" chipText={e.attack_type} />
                  <Chip
                    backgroundColor="#E6A201"
                    chipText={e.cost.toString() + " gold"}
                  />
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
