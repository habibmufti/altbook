import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcon";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

const ADD_POST_MUTATION = gql`
  mutation AddPost($content: content_String_NotNull_minLength_1!, $tags: [String], $imgUrl: String) {
    addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
      _id
      content
      tags
      imgUrl
      authorId
      author {
        _id
        name
        username
        createdAt
        updatedAt
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const CreatePost = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [createPost, { loading, error, data }] = useMutation(ADD_POST_MUTATION, {
    onCompleted: () => {
      navigation.navigate("Main");
    },
    refetchQueries: ["GetPost"],
  });
  return (
    <>
      <View style={styles.container}>
        <View>
          <VectorIcon name="arrow-back" type="Ionicons" color={Colors.black} size={20} onPress={() => navigation.goBack()} />
        </View>
        <View>
          <Text style={styles.text}>Create Post</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => {
            createPost({
              variables: {
                content: content,
                tags: ["status"],
                imgUrl: imgUrl,
              },
            });
          }}>
            <Text style={styles.btnText}>POST</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.subContainer}>
          <TextInput editable multiline numberOfLines={4} placeholder="whats on your mind" value={content} onChangeText={(value) => setContent(value)} style={styles.inputBox1} />
          <TextInput placeholder="image url" value={imgUrl} onChangeText={(value) => setImgUrl(value)} style={styles.inputBox} />
        </View>
      </ScrollView>
    </>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    borderBottomWidth: 1,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    textAlignVertical: "center",
  },
  button: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.blue,
    width: 50,
    alignItems: "center",
  },
  btnText: {
    color: Colors.white,
  },
  inputBox1: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: "90%",
    height: 400,
    textAlignVertical: "top",
    marginTop: 15,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: "90%",
    marginTop: 15,
  },
});
