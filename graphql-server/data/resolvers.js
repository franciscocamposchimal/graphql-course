import { Clientes, Usuarios } from './db';
import bcrypt from 'bcrypt';
//Token
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
//subs
import { PubSub } from 'apollo-server-express';

dotenv.config({path: 'vars.env'});

const genToken = (userLogin, secret, expiresIn) => {
	let user = {id: userLogin._id ,username: userLogin.username};
	console.log(user);
	return jwt.sign(user,secret,{expiresIn});
};

const pubsub = new PubSub();
const CLIENT_ADDED = 'clientAdded';

export const resolvers = {
	Subscription: {
		clientAdded: {
		  subscribe: () => pubsub.asyncIterator([CLIENT_ADDED]),
		},
	  },
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
		getCurrentUser: (root, args, {currentUser}) => {
			if(!currentUser){
				throw new Error("Usuario no encontrado.");
			}
			console.log(currentUser);

			let findUser = Usuarios.findById({_id: currentUser.id});

			return findUser;
		}
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
					if(error){
						rejects(error)
					}else{
						//let clone = {...nuevoCliente};
						pubsub.publish(CLIENT_ADDED, {clientAdded: nuevoCliente});
						resolve(nuevoCliente)
					}
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
		},
		auth: async (root, {username,password})=>{
			let findUser = await Usuarios.findOne({username});

			if(!findUser){
				throw new Error("Usuario no encontrado.");
			}

			let matchPassword = await bcrypt.compare(password, findUser.password);
			
			if(!matchPassword){
				throw new Error("No autorizado.");
			}
			return {
				token: genToken(
					findUser,
					process.env.JWT_SECRET,
					'10s')
			};
			
		}
	}
}