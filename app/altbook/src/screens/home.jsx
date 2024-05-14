import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import AddPost from "../components/addPost";
import { View } from "react-native";
import { Colors } from "../utils/Colors";
import Post from "../components/post";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import client from "../config/apolloClient";

const Home = () => {
  return (
    <ApolloProvider client={client}>
      <ScrollView style={styles.homeContainer}>
        <AddPost />
        <Post />
      </ScrollView>
    </ApolloProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background,
  },
});
