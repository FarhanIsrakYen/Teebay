import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum Category {
    ELECTRONICS
    FURNITURE
    HOME_APPLIANCES
    SPORTING_GOODS
    OUTDOOR
    TOYS
  }

  enum Status {
    BUY
    RENT
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    address: String!
    phone: String!
    products: [Product]!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    category: Category!
    isAvailable: Boolean!
    owner: User!
    status: Status!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    myProducts: [Product]
  }

  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!, address: String!, phone: String!): String
    login(email: String!, password: String!): String
    createProduct(title: String!, description: String!, category: Category!, status: Status!): Product
    updateProduct(id: ID!, title: String, description: String, isAvailable: Boolean): Product
    deleteProduct(id: ID!): Boolean
    buyProduct(id: ID!): Product
    rentProduct(id: ID!): Product
  }
`;

export default typeDefs;
