import { Follow } from "../model/index.js";

const resolvers = {
  Mutation: {
    follow: async (_, args, contextValue) => {
      const follow = await Follow.createFollow(args, contextValue);
      return follow;
    },
  },
};
export default resolvers;
