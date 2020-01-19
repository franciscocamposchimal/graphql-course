import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
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
  Table,
  ButtonGroup,
  Button,
  Icon
} from "@material-ui/core";

import { CLIENTES_QUERY } from "../queries";

const clientStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paperTitle: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    margin: theme.spacing(1),
  },
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
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Paper className={classes.paperTitle} elevation={0}>
              <h2>Lista Clientes</h2>
            </Paper>
          </Grid>
          <Grid item xs={4}>
			  <Paper className={classes.paperTitle} elevation={0}>
				  <Button variant="contained" className={classes.button} endIcon={<Icon>add</Icon>}>	  
				  	<Link to="/client/new">
					  Agregar
				  	</Link>
				  </Button>
			  </Paper>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell align="center">Opciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.getClientes.map(cliente => (
                    <TableRow key={cliente.id}>
                      <TableCell>{cliente.id}</TableCell>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.apellido}</TableCell>
                      <TableCell>{cliente.empresa}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          variant="text"
                          color="primary"
                          aria-label="text primary button group"
                        >
                          <Button> <Link to={`client/edit/${cliente.id}`}>Editar</Link></Button>
                          <Button>Info</Button>
                          <Button>Borrar</Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Fragment>
      );
    }}
  </Query>
);

export default Contactos;
