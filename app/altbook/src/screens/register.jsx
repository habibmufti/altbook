import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Colors } from "../utils/Colors";
import Logo from "../assets/img/altbook-logo.png";
import MetaLogo from "../assets/img/meta-logo.png";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($username: username_String_NotNull_minLength_1!, $email: email_String_NotNull_minLength_1_format_email!, $password: password_String_NotNull_minLength_5!, $name: String) {
    register(username: $username, email: $email, password: $password, name: $name) {
      _id
      name
      username
      email
    }
  }
`;

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [registerHandler, { loading, error, data }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (result) => {
      navigation.navigate("Login");
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
  const onHaveAccount = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
          <ScrollView contentContainerStyle={style.subContainer}>
            <Image source={Logo} style={style.logo} />
            <TextInput placeholder="name" value={name} onChangeText={(value) => setName(value)} style={style.inputBox} />
            <TextInput placeholder="username" value={username} onChangeText={(value) => setUsername(value)} style={style.inputBox} />
            <TextInput placeholder="email" value={email} onChangeText={(value) => setEmail(value)} style={style.inputBox} />
            <TextInput placeholder="password" value={password} secureTextEntry={true} onChangeText={(value) => setPassword(value)} style={style.inputBox} />
            <TouchableOpacity
              style={style.loginButton}
              onPress={async () => {
                await registerHandler({
                  variables: {
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                  },
                });
              }}
            >
              <Text style={style.loginText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.createAccount}
              onPress={() => {
                onHaveAccount();
              }}
            >
              <Text style={style.createAccountText}>Already have an account?</Text>
            </TouchableOpacity>
            <Image source={MetaLogo} style={style.metaLogo} />
          </ScrollView>
        </KeyboardAvoidingView>
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
    width: 70,
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
    marginTop: "20%",
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
export default Register;
