const typeDefs = `#graphql
type Follow {
    _id: ID
    followingId: String
    followerId: String
    createdAt: String
    updatedAt: String
}
type Mutation {
    follow(followingId: String): String
}
`;
export default typeDefs;
