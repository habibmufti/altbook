import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Profile from "../assets/img/user.jpg";
import CameraRoll from "../assets/img/cameraroll.png";
import { Colors } from "../utils/Colors";

const AddPost = () => {
  const navigation = useNavigation();
  const onAdd = () => {
    navigation.navigate("CreatePost");
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onAdd();
      }}
    >
      <Image source={Profile} style={styles.profileStyle} />
      <View style={styles.inputBox}>
        <Text style={styles.inputStyle}>What's on your mind?</Text>
      </View>
      <Image source={CameraRoll} style={styles.cameraRoll} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: "70%",
    paddingVertical: 8,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});

export default AddPost;
