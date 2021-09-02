import * as constants from '../../../../constants'
import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables
} from "@apollo/client/core"
import { GraphQLAPIClient } from '../interface/GraphQLAPIClient'
import GraphQLAPIMapper from "../interface/GraphQLAPIMapper"

const client = new ApolloClient({
  uri: `https://api.thegraph.com/subgraphs/name/liquity/liquity`,
  cache: new InMemoryCache()
})

/**
 * GraphQL API implementation targeting the subgraph.
 */
class TheGraphAPIClient implements GraphQLAPIClient {
  private readonly client: ApolloClient<NormalizedCacheObject>
  readonly mapper: GraphQLAPIMapper

  constructor(
    mapper: GraphQLAPIMapper
  ) {
    this.client = client
    this.mapper = mapper
  }

  async query<T>(
    query: DocumentNode, 
    vars: OperationVariables, 
    mappingCallback: (mapper: GraphQLAPIMapper, response: any) => T
  ): Promise<T> {
    return new Promise<T>((resolve) => {
      this.client
      .query({
        query: query,
        variables: vars,
        /* 
          @nshuman: I'm turning cache off here because it's critical to query fresh data from the subgraph.
          We'll need a more fine-grained control over it.
        */
        fetchPolicy: "no-cache"
      })
      .then(response => {
        console.log('TheGraph query result:')
        console.log(response)

        const mappedResult = mappingCallback(this.mapper, response)

        resolve(mappedResult)
      })
      .catch(err => { 
        throw new Error("Couldn't fetch subgraph data: " + err)
      })
    })
  }
}

export default TheGraphAPIClient
