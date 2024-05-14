import { User } from "../model/index.js";

const resolvers = {
  Query: {
    users: async (_, args, contextValue) => {
      return await User.getUsers(args, contextValue);
    },
    searchUser: async (_, args, contextValue) => {
      return await User.getUserByArgs(args, contextValue);
    },
    getUserById: async (_, args, contextValue) => {
      return await User.findUserById(args, contextValue);
    },
  },
  Mutation: {
    register: async (_, args) => {
      return await User.createUser(args);
    },
    login: async (_, args) => {
      return { access_token: await User.login(args) };
    },
  },
};

export default resolvers;
