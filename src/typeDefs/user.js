import { gql } from 'apollo-server-express'

export default gql `
extend type Query {
me: User @auth
user(id: ID!): User @auth
users: [User!]  @auth
}
extend type Mutation {
signUp(email: String, username: String!, name: String!, password: String!): UsetInputType!
signIn(email: String, password: String!): UsetInputType!
}
type User {
id: ID!
email: String!
username: String!
name: String!
chats: [Chat!]!
createdAt: String!
updatedAt: String!
}

type UsetInputType {
    user: User!
    token: String!
}
`