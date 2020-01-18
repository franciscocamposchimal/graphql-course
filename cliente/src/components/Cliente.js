import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import {
	makeStyles,
	CircularProgress,
	Grid,
	Paper,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Table
} from '@material-ui/core';

import { CLIENTES_QUERY } from '../queries';

const clientStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paperTitle: {
		padding: theme.spacing(2),
		textAlign: 'center'
	}
}));

const Contactos = () => (
	<Query query={CLIENTES_QUERY}>
		{({ loading, error, data }) => {
			const classes = clientStyles();

			if (loading) return <CircularProgress />;
			if (error) return `Error: ${error.message}`;
			console.log(data.getClientes);

			return (
				<Fragment>
					<Grid item xs={12}>
						<Paper className={classes.paperTitle}>
							<h2>Lista Clientes</h2>
						</Paper>
					</Grid>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Nombre</TableCell>
									<TableCell>Apellido</TableCell>
									<TableCell>Empresa</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.getClientes.map( cliente => (
									<TableRow key={cliente.id}>
										<TableCell>{cliente.id}</TableCell>
										<TableCell>{cliente.nombre}</TableCell>
										<TableCell>{cliente.apellido}</TableCell>
										<TableCell>{cliente.empresa}</TableCell>
									</TableRow>
                                ))}
							</TableBody>
						</Table>
					</TableContainer>
				</Fragment>
			);
		}}
	</Query>
);

export default Contactos;
