import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Map } from "../../types";
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

export default function heroes() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([] as Map[]);

  useEffect(() => {
    if (isLoading)
      fetch("http://10.0.0.133:8000/maps")
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
  }, [data, setData]);

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
            rowGap: 32,
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
              <Pressable
                key={i}
                onPress={() => router.push(`/lobby/map/${e.id}`)}
              >
                <View style={styles.page}>
                  <View style={{ flexDirection: "row", columnGap: 16 }}>
                    <Image
                      height={32}
                      width={32}
                      source={{
                        uri: `http://10.0.0.133:8000/assets/${e.image}`,
                      }}
                      resizeMethod="resize"
                    />
                    <Text style={{ fontSize: 18, color: "#FFF" }}>
                      {e.name}
                    </Text>
                  </View>
                  <Chip
                    chipText={`${e.team_count} VS ${e.team_count}`}
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
