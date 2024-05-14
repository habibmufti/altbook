import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "../assets/img/altbook-logo-cut.png";
import React from "react";
import VectorIcon from "../utils/VectorIcon";
import { Colors } from "../utils/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.menus}>
        <View style={styles.icon}>
          <VectorIcon name="add-circle" type="Ionicons" size={22} color={Colors.grey} />
        </View>
        <View style={styles.icon}>
          <VectorIcon name="search" type="Fontisto" size={20} color={Colors.grey} />
        </View>
        <View style={styles.icon}>
          <VectorIcon name="messenger" type="Fontisto" size={20} color={Colors.grey} />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
  },
  logo: {
    width: 130,
    height: 25,
    alignContent: "center",
    justifyContent: "center",
  },
  menus: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginRight: 10,
    // borderWidth: 1,
  },
  icon: {
    marginLeft: 20,
    // borderWidth: 1,
  },
});
