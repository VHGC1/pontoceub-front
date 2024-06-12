import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={Login} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
