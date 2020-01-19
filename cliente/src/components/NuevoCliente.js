import React, { Fragment } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Grid, Paper, makeStyles, TextField, MenuItem, Button } from '@material-ui/core';
import { NUEVO_CLIENTE } from '../mutations';
import { Mutation } from 'react-apollo';

const clientStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paperTitle: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
	button: {
		margin: theme.spacing(1)
	},
	form: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 350
		}
	}
}));

export default function NuevoCliente() {
	const classes = clientStyles();

	const [ cliente, setCliente ] = React.useState({
		nombre: '',
		apellido: '',
		empresa: '',
		edad: '',
		email: '',
		tipo: 'PREMIUM'
	});

	const updateField = (e) => {
		setCliente({
			...cliente,
			[e.target.name]: e.target.value
		});
	};

	return (
		<Fragment>
			<Grid item xs={12}>
				<Paper className={classes.paperTitle} elevation={0}>
					<h2>Nuevo Cliente</h2>
				</Paper>
			</Grid>
			<Grid item xs={12}>
				<Grid container justify="center">
					<Paper>
						<Mutation mutation={NUEVO_CLIENTE}>
							{(crearCliente) => (
								<form className={classes.form} noValidate autoComplete="off">
									<div>
										<TextField
											name="nombre"
											label="Nombre"
											variant="filled"
											value={cliente.username}
											onChange={updateField}
										/>
										<TextField
											name="apellido"
											label="Apellido"
											variant="filled"
											value={cliente.apellido}
											onChange={updateField}
										/>
									</div>
									<div>
										<TextField
											name="empresa"
											label="Empresa"
											variant="filled"
											value={cliente.empresa}
											onChange={updateField}
										/>
										<TextField
											name="email"
											label="Email"
											variant="filled"
											value={cliente.email}
											onChange={updateField}
										/>
									</div>
									<div>
										<TextField
											name="edad"
											type="number"
											label="Edad"
											variant="filled"
											value={cliente.edad}
											onChange={updateField}
										/>
										<TextField
											name="tipo"
											select
											label="Plan"
											helperText="Porfavor selecciona un plan"
											variant="filled"
											value={cliente.tipo}
											onChange={updateField}
										>
											<MenuItem key="1" value="PREMIUM">
												PREMIUM
											</MenuItem>
											<MenuItem key="2" value="BASICO">
												BASICO
											</MenuItem>
										</TextField>
									</div>
									<div>
										<Button
											variant="contained"
											color="primary"
											size="large"
											className={classes.button}
											startIcon={<SaveIcon />}
											onClick={(e) => {
												e.preventDefault();
                        cliente.edad = Number(cliente.edad);
                        const {nombre,apellido,empresa,edad,tipo,email} = cliente;
                        const input = {nombre,apellido,empresa,edad,tipo,email};
												crearCliente({
													variables: { input }
												});
											}}
										>
											Guardar
										</Button>
									</div>
								</form>
							)}
						</Mutation>
					</Paper>
				</Grid>
			</Grid>
		</Fragment>
	);
}
