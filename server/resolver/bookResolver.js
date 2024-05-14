import { Book } from "../model/index.js";

const resolvers = {
  Query: {
    books: async () => {
       return await Book.findAllBooks()
      },
  },
  Mutation: {
    createBook: async (_, args) => {
      const response = await Book.createBook(args);
      console.log(response, "inii response");
      return response
    } 
  }
};

export default resolvers