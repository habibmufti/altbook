import { View, StyleSheet, Image } from "react-native";
import { Colors } from "../utils/Colors";
import PostHeader from "./postHeader";
import PostFooter from "./postFooter";
import { PostData } from "../data/postData";
import { useQuery, gql } from "@apollo/client";
import profile from "../assets/img/user.jpg";
import { useEffect, useState } from "react";

// import PostHeader from './PostHeader';
// import PostFooter from './PostFooter';
// import {PostData} from '../data/PostData';

const GETPOST_QUERY = gql`
  query GetPost {
    getPost {
      _id
      content
      tags
      imgUrl
      authorId
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
      author {
        _id
        name
        username
        createdAt
        updatedAt
      }
    }
  }
`;

const Post = () => {
  const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(GETPOST_QUERY);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const formattedData = data?.getPost?.map((post) => ({
    id: post._id,
    name: post.author.name,
    postImg: post.imgUrl,
    profileImg: profile, // sesuaikan dengan URL gambar profil
    caption: post.content,
    date: "1d", // sesuaikan dengan tanggal posting
    comments: post.comments.length,
    reaction: post.likes.length,
  }));
  return (
    <View style={styles.postContainer}>
      {formattedData
        ? formattedData.map((item) => (
            <View key={item.id}>
              <PostHeader data={item} />
              <Image source={item.postImg} style={styles.postImg} />
              <PostFooter data={item} />
            </View>
          ))
        : PostData.map((item) => (
            <View key={item.id}>
              <PostHeader data={item} />
              <Image source={item.postImg} style={styles.postImg} />
              <PostFooter data={item} />
            </View>
          ))}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  postImg: {
    width: "100%",
    height: 250,
  },
});

export default Post;
