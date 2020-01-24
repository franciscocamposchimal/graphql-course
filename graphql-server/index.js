import express from 'express';
import cors from 'cors';
// graphql
import { ApolloServer } from 'apollo-server-express';
import { typeDefs }  from './data/schema';
import { resolvers } from './data/resolvers';

const app = express();
app.use(cors())

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    tracing: true,
});

server.applyMiddleware({app});

app.listen({ port: 8000 }, () => console.log(`Server is online in http://localhost:8000${server.graphqlPath}`));