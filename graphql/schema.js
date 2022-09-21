module.exports = `
type Query {
    getAllProducts: [Product]
}
type Mutation {
    addProduct(input: ProductCreateInput): Product
    deleteProduct(id: ID!): Product
    updateProduct(id: ID!, input: ProductUpdateInput): Product
}
type Product {
    _id: ID
    title: String
    price: Float
    thumbnail: String
}
input ProductCreateInput {
  title: String!
  price: Float!
  thumbnail: String!
}
input ProductUpdateInput {
  title: String
  price: Float
  thumbnail: String
}
`;
