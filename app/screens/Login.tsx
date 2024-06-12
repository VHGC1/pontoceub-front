import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = () => {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassord] = useState(true);

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      console.log(result)
      console.log(result.msg.response?.data);
      alert(result.msg.response.data?.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}> Login</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            style={styles.inputText}
            value={email}
            onChangeText={(text) => setEmail(text)}
            selectionColor={"#000"}
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.inputView, styles.inputViewPassword]}>
          <TextInput
            style={[styles.inputText, { width: "90%" }]}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            selectionColor={"#000"}
            secureTextEntry={showPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity onPress={() => setShowPassord(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={login}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25
  },

  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#000",
    marginBottom: 40,
  },

  inputView: {
    width: "80%",
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 18,
  },

  inputViewPassword: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputText: {
    height: 50,
    color: "#000",
  },

  loginBtn: {
    width: "80%",
    backgroundColor: "#ccc",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default Login;
