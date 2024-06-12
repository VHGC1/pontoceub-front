import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { IinitialRegion } from "../interfaces/IinitialRegion";
import { IcurrentLocation } from "../interfaces/IcurrentLocation";
import api from "../api";

export default function HomeScreen() {
  const [currentLocation, setCurrentLocation] = useState<
    IcurrentLocation | IcurrentLocation
  >();
  const [initialRegion, setInitialRegion] = useState<
    IinitialRegion | IinitialRegion
  >();
  const [hour, setHour] = useState(dayjs().locale("pt-br"));

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(dayjs());
    }, 1000 * 60);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("A permissão para acessar o local foi negada!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();

    return () => clearInterval(timer);
  }, []);

  async function timesheetRegistry() {
    await api
      .post("/time-registry/create", {
        position: {
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
        },
      })
      .then((response: any) => {
        alert(
          `${response.data?.activityType.toLowerCase()} ${
            response.data?.activityType.slice(-1) === "A"
              ? "registrada"
              : "registrado"
          }!`
        );
      })
      .catch((e: any) => alert(e.response?.data.message));
  }

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, styles.mapSkeleton]}></View>

      <View style={styles.clockContainer}>
        <MaterialCommunityIcons name={"clock-outline"} size={35} color="#ccc" />
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          {hour.format("HH:mm")}
        </Text>
        <MaterialCommunityIcons
          name={"clock-outline"}
          size={35}
          color="black"
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={timesheetRegistry}>
        <Text style={{ fontSize: 15 }}>Registrar Ponto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 25,
  },

  mapContainer: {
    width: "85%",
    height: "50%",
    borderRadius: 25,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapSkeleton: {
    backgroundColor: "#F6F6F6",
  },

  clockContainer: {
    backgroundColor: "#ccc",
    padding: 25,
    width: "85%",
    marginVertical: 30,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 25,
  },

  btn: {
    width: "85%",
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
