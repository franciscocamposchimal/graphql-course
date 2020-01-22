import React, { Fragment } from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { CLIENTE_QUERY } from '../queries';
import { Query } from 'react-apollo';

const editClientStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paperTitle: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
}));

export default function EditarCliente(props){
    const classes = editClientStyles();
    const { id } = props.match.params;
    return(
        <Fragment>
          <Grid item xs={12}>
            <Paper className={classes.paperTitle} elevation={0}>
              <h2>Editar Cliente</h2>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Query query={ CLIENTE_QUERY } variables={{id}}>
                {({ loading, error, data })=>{
                    if(loading) return 'Cargando...';
                    if(error) return `Error: ${error.message}`;

                    return(
                        <Paper>
                        <div>
                            id: {data.getCliente.id} - nombre: {data.getCliente.nombre} - empresa: {data.getCliente.empresa}
                        </div>
                        </Paper>
                    );
                }}
            </Query>
          </Grid>
        </Fragment>
    );
};