import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.Promise = global.Promise;

const urlDB = 'mongodb+srv://franko:campos@cluster0-bgsj4.mongodb.net/test?retryWrites=true&w=majority'; 

mongoose.connect(urlDB, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false
});
//CLIENTES
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    email: String,
    edad: Number,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);
//USUARIOS
const usuariosSchema = new mongoose.Schema({
    username: String,
    password: String
});

usuariosSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) return next(err);

        bcrypt.hash( this.password, salt, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        })
    })
});

const Usuarios = mongoose.model('usuarios', usuariosSchema);

export { Clientes, Usuarios };