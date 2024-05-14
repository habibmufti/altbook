import dbConnection from "./dbConnection.js";
const database = dbConnection.database

const users = database.collection("users")
const books = database.collection("books");
const posts = database.collection("posts");
const follows = database.collection("follows");

export default {users, books, posts, follows}