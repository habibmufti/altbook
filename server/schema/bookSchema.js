
const typeDefs = `#graphql
  type Book {
    title: String!
    author: String!
    createdAt: String,
    updatedAt: String
  }
  type Query {
    books: [Book]
  }
  type Mutation {
    createBook( title: String! @constraint(minLength: 1), author: String! @constraint(minLength: 5, format: "email")): Book
  }
`;
export default typeDefs