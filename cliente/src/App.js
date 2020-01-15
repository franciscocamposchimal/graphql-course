import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// Material UI
import { 
  makeStyles, 
  AppBar,
  Toolbar,
  Typography,
  IconButton
   } from '@material-ui/core';
// Icons
import MenuIcon from '@material-ui/icons/Menu';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({networkError,graphQLErrors}) => {
    console.log('networkError',networkError);
    console.log('graphQLErrors',graphQLErrors);
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <ApolloProvider client={client}>
      <div className={classes.root}>
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
    </div>
      </ApolloProvider>
    </div>
  );
}

export default App;
