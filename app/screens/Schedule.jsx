import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import api from "../api";

const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useFocusEffect(
    useCallback(() => {
      api.get("/classes/user").then((r) => setClasses(r.data));
    }, [])
  );

  useEffect(() => {
    const weekDays = [
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
    ];

    const today = dayjs().day() - 1;

    classes
      ?.map(({ day }) => day)
      .filter((i, index) => i == weekDays[today] && setSelectedDay(index));
  }, [classes]);

  return (
    <View style={styles.container}>
      {classes.length === 0 ? (
        <div>Não existem aulas cadastradas!</div>
      ) : (
        <View style={styles.boxContainer}>
          <View>
            <Text style={styles.boxContainerTitle}>Aulas</Text>
            <View style={styles.lineBoxContainerHeader} />
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.daysContainer}>
              {classes?.map(({ day }, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDay(index)}
                  style={[
                    {
                      backgroundColor:
                        index == selectedDay ? "#fff" : "#f2f2f2",
                    },
                    styles.daysButton,
                  ]}
                >
                  <Text
                    style={{
                      color: index == selectedDay ? "#000" : "#ccc",
                      fontWeight: index === selectedDay ? "bold" : "normal",
                    }}
                  >
                    {day.charAt(0).toUpperCase() + day.substring(1, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.classesContainer}>
              {classes[selectedDay]?.classes.map(
                ({ schedule, discipline, campus }, index) => (
                  <View key={campus + index}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={"clock-outline"}
                        size={15}
                        color="black"
                      />
                      <Text>{schedule}</Text>
                    </View>

                    <Text>{discipline}</Text>
                    <Text>{campus}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 25,
  },

  boxContainer: {
    paddingTop: 25,
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 25,
  },

  lineBoxContainerHeader: {
    backgroundColor: "#000",
    height: 2,
    width: "100%",
  },

  boxContainerTitle: {
    marginLeft: 25,
    marginBottom: 10,
  },

  daysContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },

  daysButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  classesContainer: {
    flex: 3,
    flexDirection: "column",
    paddingVertical: 18,
    paddingHorizontal: 25,
    gap: 15,
  },
});

export default Schedule;
