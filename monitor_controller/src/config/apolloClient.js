import { ApolloClient, InMemoryCache, makeVar, HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

// export const isLogin = makeVar(false)
export const currentChange = makeVar({})

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/',
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           favorites: {
//             read() {
//               return isLogin()
//             }
//           }
//         }
//       }
//     }
//   }),
// })

const wsLink = new WebSocketLink({
  uri: 'ws://54.254.218.69:4000/graphql',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: "http://54.254.218.69:4000/"
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  uri: "http://54.254.218.69:4000/",
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // loginStatus: {
          //   read() {
          //     return isLogin()
          //   }
          // },
          currentChange: {
            read() {
              return currentChange()
            }
          }
        }
      }
    }
  }),
})

export default client