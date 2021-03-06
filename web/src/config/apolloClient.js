import { ApolloClient, InMemoryCache, HttpLink, split, makeVar } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const isLogin = makeVar(false);

const httpLink = new HttpLink({
  uri: "http://54.254.218.69:4000/"
});

const wsLink = new WebSocketLink({
  uri: 'ws://54.254.218.69:4000/graphql',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client;
