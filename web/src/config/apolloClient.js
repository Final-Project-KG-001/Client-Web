import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'


const client = new ApolloClient({
  uri: 'http://54.254.137.89/',
  cache: new InMemoryCache(),
})

export default client