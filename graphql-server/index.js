import express from 'express';
// graphql
import graphqlHTTP from 'express-graphql';
import { schema }  from './data/schema';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.use(
'/graph',
	graphqlHTTP({
		//schema
		schema,
		// usar graphql
		graphiql: true
	})
);

app.listen(8000, () => console.log('Server is online.'));
