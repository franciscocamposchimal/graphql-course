import express from 'express';
// graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';
//resolvers
import resolvers from './resolvers';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.use(
'/graph',
	graphqlHTTP({
		//schema
		schema,
		// resolver
		rootValue: resolvers,
		// usar graphql
		graphiql: true
	})
);

app.listen(8000, () => console.log('Server is online.'));
