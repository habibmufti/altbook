import { GraphQLError } from "graphql";
import { collection } from "../config/index.js";

export default class Book {
    static async createBook (args) {
      const book = await collection.books.insertOne({
        title: args.title,
        author: args.author,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      const newBook = await collection.books.findOne({
        _id: book.insertedId
      })
      console.log(args);
      console.log(book);
      console.log(newBook);
      return newBook
    }
    static async findAllBooks() {
      return (await collection.books.find({}).toArray()).map(e => {
        e.createdAt && e.createdAt
        // console.log(e.createdAt);
        e.updatedAt && e.updatedAt
        // console.log(e.updatedAt);
        return e
      })
    }
}

