import { Post } from "../model/index.js";

const resolvers = {
  Query: {
    getPost: async (_, args, contextValue) => {
      return await Post.getPost(contextValue);
    },
    getPostById: async (_, args, contextValue) => {
      return await Post.findPostById(args,contextValue);
    },
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      return await Post.createPost(args, contextValue);
    },
    addComment: async (_, args, contextValue) => {
      return await Post.createComment(args, contextValue);
    },
    addLike: async (_, args, contextValue) => {
      return await Post.createLike(args, contextValue);
    },
  },
};

export default resolvers;
