import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home";
import { useAuth } from "../context/AuthContext";
import Schedule from "../screens/Schedule";
import TimesheetList from "../screens/TimesheetList";

const Drawer = createDrawerNavigator();

export default function UserStack() {
  const { onLogout } = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={{ title: "", drawerStyle: { backgroundColor: "#fff" } }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Sair"
              onPress={onLogout}
              icon={() => (
                <MaterialCommunityIcons name="logout" size={35} color="#000" />
              )}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="note-edit-outline"
              size={35}
              color="#000"
            />
          ),
          drawerLabel: "Registro de Ponto",
        }}
      />

      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          drawerLabel: "Horário das aulas",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="calendar-month"
              size={35}
              color="#000"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="TimesheetList"
        component={TimesheetList}
        options={{
          drawerLabel: "Lista de Registros",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={35}
              color="#000"
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
