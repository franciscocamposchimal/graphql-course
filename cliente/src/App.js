import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  onError: ({networkError,graphQLErrors}) => {
    console.log('networkError',networkError);
    console.log('graphQLErrors',graphQLErrors);
  }
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <h1>
          Holii!!
        </h1>
      </ApolloProvider>
    </div>
  );
}

export default App;
