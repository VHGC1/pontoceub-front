import { NavigationContainer } from "@react-navigation/native";
import UserStack from "./userStackDrawer.routes";
import { useAuth } from "../context/AuthContext";
import AuthStack from "./AuthStack.routes";

export default function Routes() {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      {authState?.authenticated ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
