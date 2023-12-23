import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Map } from "../../../types";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { MenuButton } from "../../../components/MenuButton";
import appBackground from "../../../assets/bg.jpg";

export default function map() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({} as Map);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetch("http://wbgl.eu/api/v1/map/" + id)
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MenuButton />
          {isLoading ? (
            <ActivityIndicator size={64} color="#2F95DC" />
          ) : (
            <View style={styles.page}>
              <Image
                width={Dimensions.get("window").width - 64}
                height={Dimensions.get("window").height - 64}
                style={{ resizeMode: "contain" }}
                source={{
                  uri: `http://wbgl.eu/api/v1/assets/${data.image}`,
                }}
              />
            </View>
          )}
        </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "600",
  },
});
