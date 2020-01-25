import express from 'express';
import cors from 'cors';
// graphql
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';
//Token
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: 'vars.env' });

const app = express();
app.use(cors());

const server = new ApolloServer({
	typeDefs,
	resolvers,
	tracing: true,
	context: async ({ req }) => {
		let authHeader = req.headers['authorization'];
		if (authHeader !== undefined) {
			try {
                if (authHeader.startsWith("Bearer ")){
                    let token = authHeader.substring(7, authHeader.length);
                    let currentUser = await jwt.verify(token, process.env.JWT_SECRET);
                    req.currentUser = currentUser;
                    return {
                        currentUser
                    };
               } else {
                  throw new Error("Invalid token");
               }

			} catch (err) {
                console.log(err);
                throw new Error("Unauthorized");
            }
		}
	}
});

server.applyMiddleware({ app });

app.listen({ port: 8000 }, () => console.log(`Server is online in http://localhost:8000${server.graphqlPath}`));
