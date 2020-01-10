import express from 'express';
// graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world!');
});

//resolver
const root = { cliente: () => {
	return {
		"id": 12343455,
        "nombre": "Franko",
        "apellido": "Campos",
		"empresa": "CERVUS",
		"emails": [
			{email: "email@empresa.com"},
			{email: "email@personal.com"}
		]
	}
} };

app.use(
	'/graph',
	graphqlHTTP({
		//schema
		schema,
		// resolver
		rootValue: root,
		// usar graphql
		graphiql: true
	})
);

app.listen(8000, () => console.log('Server is online.'));
