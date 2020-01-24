import { Clientes, Usuarios } from './db';

export const resolvers = {
	Query: {
		getClientes: (parent, {limite}, context, info) => {
			//console.log(info.fieldName);
			//console.log(info.operation.operation);
			//console.log(info);
			return Clientes.find({}).
					limit(limite).
					sort({ _id: -1 });
		},
		getCliente: (root, {id}) => {
			return new Promise( (resolve, object) => {
				Clientes.findById( id, (error, cliente) => {
					if(error) rejects(error)
					else resolve(cliente)
				});
			});
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
		},
		actualizarCliente: (root, {input}) => {
			return new Promise( (resolve, object) => {
				Clientes.findOneAndUpdate( {_id: input.id}, input,{new: true}, (error, cliente) => {
					if(error) rejects(error)
					else resolve(cliente)
				});
			});
		},
		eliminarCliente: (root, {id}) => {
			return new Promise( (resolve, object) => {
				Clientes.findOneAndRemove( {_id: id}, (error) => {
					if(error) rejects(error)
					else resolve("Se eliminó correctamente")
				});
			});
		},
		crearUsuario: async (root,{username, password}) => {
			let isExist = await Usuarios.findOne({username});
			if (isExist){
				throw new Error("Usuario ya existe.");
			}
			let nuevoUsuario = await new Usuarios({
				username,
				password
			}).save();
			return "Usuario creado...";
		}
	}
}