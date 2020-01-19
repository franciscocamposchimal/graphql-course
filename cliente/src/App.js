import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Material UI
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Container
} from "@material-ui/core";
// Icons
import MenuIcon from "@material-ui/icons/Menu";

import Clientes from "./components/Cliente";
import EditarCliente from "./components/EditarCliente";
import NuevoCliente from "./components/NuevoCliente";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("networkError", networkError);
    console.log("graphQLErrors", graphQLErrors);
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <div className={classes.root}>
          <Router>
            <Fragment>
              <AppBar position="static">
                <Toolbar variant="dense">
                  <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" color="inherit">
                    CERVUS CRM
                  </Typography>
                </Toolbar>
              </AppBar>
              <Container>
                <Grid container>
                  <Switch>
                    <Route exact path="/" component={Clientes} />
                    <Route exact path="/client/new" component={NuevoCliente} />
                    <Route exact path="/client/edit/:id" component={EditarCliente} />
                  </Switch>
                </Grid>
              </Container>
            </Fragment>
          </Router>
        </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
