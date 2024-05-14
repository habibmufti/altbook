const typeDefs = `#graphql
 
  type User {
    _id: ID
    name: String
    username: String
    email: String
  }
  type Followers {
    _id: ID,
    username: String
  }
  type Followings {
    _id: ID,
    username: String
  }
  type UserDetail {
    _id: ID
    name: String
    username: String
    email: String
    followers: [Followers]
    followings: [Followings]
  }
  type access_token {
    access_token: String
  }
  type Query {
    users: [User]
    searchUser(username: String! @constraint(minLength:  1)): [User]
    getUserById(userId: String! @constraint(minLength: 1)): UserDetail
  }
  type Mutation {
    register( 
      name: String
      username: String! @constraint(minLength: 1)
      email: String! @constraint(minLength: 1, , format: "email")
      password: String! @constraint(minLength: 5)
    ): User,
    login(
      email: String! @constraint(minLength: 1, , format: "email")
      password: String! @constraint(minLength: 5)
    ): access_token  
  }
`;

export default typeDefs;
