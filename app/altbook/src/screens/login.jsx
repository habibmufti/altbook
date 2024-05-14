import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useMutation, useQuery, gql } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useState } from "react";
import { Colors } from "../utils/Colors";
import Logo from "../assets/img/altbook-logo.png";
import MetaLogo from "../assets/img/meta-logo.png";
import AuthContext from "../context/authContext";

const MUTATION_LOGIN = gql`
  mutation Login($email: email_String_NotNull_minLength_1_format_email!, $password: password_String_NotNull_minLength_5!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

const Login = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginHandler, { loading, error, data }] = useMutation(MUTATION_LOGIN, {
    onCompleted: async (result) => {
      if (result?.login?.access_token) {
        await SecureStore.setItemAsync("access_token", result?.login?.access_token);
        auth.setIsLogin(true);
      }
    },
    onError: (error) => {
      let errorMessages = error.message
        .split("\n")
        .reduce((accumulator, errorMessage) => {
          if (errorMessage.includes('Variable "$username"')) {
            accumulator.push("Username is required");
          } else if (errorMessage.includes('Variable "$email"')) {
            accumulator.push("Email is required");
          } else if (errorMessage.includes('Variable "$password"')) {
            accumulator.push("Password is required");
          }
          return accumulator;
        }, [])
        .join("\n");

      Alert.alert("BAD REQUEST", errorMessages, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    },
  });
  const onLogin = () => {
    navigation.navigate("Main");
  };
  const onCreateAccount = () => {
    navigation.navigate("Register");
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <View style={style.subContainer}>
          <Image source={Logo} style={style.logo} />
          <TextInput placeholder="email" value={email} onChangeText={(value) => setEmail(value)} style={style.inputBox} />
          <TextInput placeholder="password" value={password} secureTextEntry={true} onChangeText={(value) => setPassword(value)} style={style.inputBox} />
          <TouchableOpacity
            style={style.loginButton}
            onPress={() => {
              loginHandler({
                variables: {
                  email: email,
                  password: password,
                },
              });
            }}
          >
            <Text style={style.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.createAccount}
            onPress={() => {
              onCreateAccount();
            }}
          >
            <Text style={style.createAccountText}>Create an account</Text>
          </TouchableOpacity>
          <Image source={MetaLogo} style={style.metaLogo} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const style = StyleSheet.create({
  logo: {
    width: 220,
    height: 55,
    marginVertical: "25%",
  },
  metaLogo: {
    width: 90,
    height: 55,
  },
  container: {
    padding: 16,
    marginTop: 10,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: "90%",
    marginTop: 15,
  },
  loginButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.blue,
    width: "90%",
    alignItems: "center",
  },
  createAccount: {
    marginTop: "40%",
    borderWidth: 1,
    borderColor: Colors.blue,
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    width: "90%",
    alignItems: "center",
  },
  loginText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "500",
  },
  createAccountText: {
    color: Colors.blue,
    fontSize: 15,
    fontWeight: "500",
  },
});
export default Login;
