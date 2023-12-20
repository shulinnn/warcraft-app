import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { MenuButton } from "../../components/MenuButton";
import appBackground from "../../assets/bg.jpg";

export default function rules() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={appBackground}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.1 }}
      >
        <MenuButton />
        <ScrollView
          style={{ marginTop: 128, marginBottom: 64 }}
          contentContainerStyle={{ gap: 32 }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 36,
              color: "#FFF",
              fontWeight: "bold",
            }}
          >
            Přehled tahů
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#FFF",
              fontWeight: "500",
            }}
          >
            1. Fáze
          </Text>
          <View
            style={{
              flexDirection: "column",
              rowGap: 8,
              paddingHorizontal: 32,
            }}
          >
            <Text style={{ color: "#FFF" }}>Pohyb</Text>
            <Text style={{ color: "#FFF" }}>Oprava budov</Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#FFF",
              fontWeight: "500",
            }}
          >
            2. Fáze
          </Text>
          <View
            style={{
              flexDirection: "column",
              rowGap: 8,
              paddingHorizontal: 32,
            }}
          >
            <Text style={{ color: "#FFF" }}>Těžba</Text>
            <Text style={{ color: "#FFF" }}>Stavba jednotek / hrdinů</Text>
            <Text style={{ color: "#FFF" }}>Stavba budov</Text>
            <Text style={{ color: "#FFF" }}>Útok</Text>
            <Text style={{ color: "#FFF" }}>Tech</Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#FFF",
              fontWeight: "500",
            }}
          >
            3. Fáze
          </Text>
          <View
            style={{
              flexDirection: "column",
              rowGap: 8,
              paddingHorizontal: 32,
            }}
          >
            <Text style={{ color: "#FFF" }}>Braní karet</Text>
            <Text style={{ color: "#FFF" }}>Použití karty</Text>
            <Text style={{ color: "#FFF" }}>
              Vylepšení zdokonalení (Obchod / Kovárna)
            </Text>
            <Text style={{ color: "#FFF" }}>
              Použití zdokonalení ( obchod / kovárna)
            </Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#FFF",
              fontWeight: "500",
            }}
          >
            4. Fáze
          </Text>
          <View
            style={{
              flexDirection: "column",
              rowGap: 8,
              paddingHorizontal: 32,
            }}
          >
            <Text style={{ color: "#FFF" }}>Koupení předmětu</Text>
            <Text style={{ color: "#FFF" }}>Použití předmětu</Text>
          </View>
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
});
