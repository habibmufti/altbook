import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { Colors } from "../utils/Colors";
import AuthContext from "../context/authContext";
import * as SecureStore from "expo-secure-store";

const Profile = () => {
  const auth = useContext(AuthContext);
  const onLogout = async () => {
    const token = await SecureStore.deleteItemAsync("access_token");
    auth.setIsLogin(false)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: "500",
    marginTop: 30,
  },
  logout: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: Colors.blue,
    padding: 12,
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    marginBottom: 30,
  },
});

export default Profile;
