import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client'


export const isLogin = makeVar(false)

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favorites: {
            read() {
              return isLogin()
            }
          }
        }
      }
    }
  }),
})

export default client