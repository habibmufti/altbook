import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./src/utils/Colors";
import Login from "./src/screens/login";
import Register from "./src/screens/register";
import Main from "./src/screens/main";
import CreatePost from "./src/screens/createPost";
import AddPost from "./src/components/addPost";
import { ApolloProvider, gql } from "@apollo/client";
import client from "./src/config/apolloClient";
import { useState } from "react";
import AuthContext from "./src/context/authContext";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync("access_token")
      .then((result) => {
        if (result) setIsLogin(true);
      })
      .catch((err) => {
        console.log("🚀 ~ useEffect ~ err:", err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLogin ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
            ) : (
              <>
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="AddPost" component={AddPost} />
                <Stack.Screen name="CreatePost" component={CreatePost} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
