import express from 'express';
// graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello world!');
});

class Cliente {
	constructor(id, { nombre, apellido, empresa }) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.empresa = empresa;
	}
}

const clienteDB = {};

//resolver
const root = {
	cliente: () => {
		return {
			id: 12343455,
			nombre: 'Franko',
			apellido: 'Campos',
			empresa: 'CERVUS',
			emails: [ { email: 'email@empresa.com' }, { email: 'email@personal.com' } ]
		}
	},
	crearCliente: ({input}) => {
		const id = 12344;
		clienteDB[id] = input;
		return new Cliente(id, input);
	}
};

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
