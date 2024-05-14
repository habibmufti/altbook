import { StyleSheet} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../utils/Colors";
import { navbarData } from "../data/navbarData";
import VectorIcon from "../utils/VectorIcon";

const Tab = createMaterialTopTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.blue,
        tabBarInactiveTintColor: Colors.grey,
      })}
    >
      {navbarData.map((tab) => (
        <Tab.Screen
          key={tab.id}
          name={tab.name}
          component={tab.route}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <VectorIcon
                type={focused ? tab.activeiconType : tab.inactiveIconType}
                name={focused ? tab.activeIconName : tab.inactiveIconName}
                size={focused ? tab.size : tab.unFocusSize}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
