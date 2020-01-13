import mongoose from 'mongoose';
import { Clientes } from './db';

export const resolvers = {
	Query: {
		getCliente: ({id}) => {
			return new Cliente(id, clientesDB[id]);
		},
	},
	Mutation: {
		crearCliente: (root,{input}) => {
			let nuevoCliente = new Clientes({
				id : input.id,
				nombre : input.nombre,
				apellido : input.apellido,
				empresa : input.empresa,
				email: input.email,
				edad: input.edad,
				tipo : input.tipo,
				pedidos : input.pedidos
			});
			nuevoCliente.id = nuevoCliente._id;

			return new Promise( (resolve, object) => {
				nuevoCliente.save((error) => {
					if(error) rejects(error)
					else resolve(nuevoCliente)
				});
			});
		}
	}
}