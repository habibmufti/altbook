const typeDefs = `#graphql
type Comments {
    content: String! @constraint(minLength: 1)
    username: String! @constraint(minLength: 1)
    createdAt: String
    updatedAt: String
}
type Likes {
    username: String! @constraint(minLength: 1)
    createdAt: String
    updatedAt: String
}
type author {
    _id: String
    name: String
    username: String
    createdAt: String
    updatedAt: String
}
type Post {
    _id: ID
    content: String! @constraint(minLength: 1)
    tags: [String]
    imgUrl: String
    authorId: String! @constraint(minLength: 1)
    author: author
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
}
type Query {
    getPost: [Post]
    getPostById(postId: String! @constraint(minLength: 1)): Post
}
type Mutation {
 addPost(
    content: String! @constraint(minLength: 1)
    tags: [String]
    imgUrl: String
 ): Post,
 addComment(
    postId: String! @constraint(minLength: 1)
    content: String! @constraint(minLength: 1)
 ): String
 addLike(postId: String! @constraint(minLength: 1)): String
}
`;
export default typeDefs;
