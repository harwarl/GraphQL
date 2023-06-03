import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { products, reviews, categories } from "./data/data.js";

const typeDefs = `#graphql
    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
    } 

    type Category {
        id: ID!
        name: String!
        products: [Product!]!
    }

    type Query {
        hello: String
        products: [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }
`;

const resolvers = {
    Query : {
        hello:  (_, args, context) =>{
            return 'World'
        },
        products:  (_, args, context) =>{
            return products
        },
        product: (_, {id}, context) =>{
            return products.find((c)=> c.id === id);
        },
        categories: (_, args, context) =>{
            return categories
        },
        category: (_, {id}, context) =>{
            return categories.find((c)=> c.id === id);
        }
    },
    Category: {
        products: (parent, args, context) =>{
            const { id } = parent;
            return products.filter((c)=> c.categoryId === id);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server);
console.log('Server is ready at ', url)