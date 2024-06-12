import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import api from "../api";

const TimesheetList = () => {
  const [timeSheetList, setTimeSheetList] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [lastPage, setLastPage] = useState();

  useFocusEffect(
    useCallback(() => {
      api
        .get(`time-registry/registries?pageNumber=${pageNo}&size=7`)
        .then((r) => {
          console.log(r);
          setTimeSheetList(r.data.content);
          setLastPage(r.data.last);
        });
    }, [])
  );

  const marginTopFlatList = () => {
    return <View style={{ marginTop: 50 }}></View>;
  };

  const addOnTheTimeSheetList = () => {
    setPageNo(pageNo + 1);

    if (!lastPage) {
      api
        .get(`time-registry/registries?pageNumber=${pageNo}&size=7`)
        .then((r) => setTimeSheetList([...timeSheetList, ...r.data]));
    }
  };

  return (
    <View style={styles.container}>
      {timeSheetList.length === 0 && (
        <div style={{ alignSelf: "center", marginTop: "1rem" }}>
          Não existem registros no sistema!
        </div>
      )}
      <FlatList
        onEndReached={() => addOnTheTimeSheetList()}
        onEndReachedThreshold={0.01}
        ListFooterComponent={marginTopFlatList}
        style={styles.flatListStyle}
        data={timeSheetList}
        renderItem={({ item }) => (
          <View key={Math.random()} style={styles.card}>
            <View style={styles.cardDate}>
              <Text>
                {item.dateTimeRegistry
                  ?.split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </Text>
              <Text>
                {item.dateTimeRegistry?.split("T")[1].substring(0, 5)}
              </Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>{item.activityType}</Text>
            <Text>{item.activity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  flatListStyle: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
  },

  card: {
    backgroundColor: "#ccc",
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
  },

  cardDate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TimesheetList;
