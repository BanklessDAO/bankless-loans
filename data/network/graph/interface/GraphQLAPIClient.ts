import { DocumentNode, OperationVariables } from '@apollo/client/core'
import {
  GLOBAL_STATE_QUERY
} from '../queries'
import GraphQLAPIMapper from './GraphQLAPIMapper'

/**
 * Abstract GraphQL API client
 * @property {GraphQLAPIMapper} mapper Model mapper
 */
export interface GraphQLAPIClient {
  readonly mapper: GraphQLAPIMapper

  /**
   * Universal query.
   */
  query<T>(
    query: DocumentNode, 
    vars: OperationVariables, 
    mappingCallback: (mapper: GraphQLAPIMapper, response: any) => T
  ): Promise<T>
}

export { 
  GLOBAL_STATE_QUERY
}