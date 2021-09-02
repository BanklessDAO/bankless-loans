import DiscoveryService from '../interface/DiscoveryService'
import LiquityState from '../../../models/LiquityState'
import { 
  GraphQLAPIClient, 
  GLOBAL_STATE_QUERY 
} from '../../../data/network/graph/interface/GraphQLAPIClient'

class DefaultDiscoveryService implements DiscoveryService {
  readonly graphQLAPIClient: GraphQLAPIClient

  constructor (
    graphQLAPIClient: GraphQLAPIClient
  ) {
    this.graphQLAPIClient = graphQLAPIClient
  }

  /**
   * Get the most recent state of the protocol.
   */
  async getCurrentState(): Promise<LiquityState> {
    // Get indexed on-chain data

    var liquityState = await this.graphQLAPIClient
      .query(
        GLOBAL_STATE_QUERY, 
        {}, 
        (mapper, response) => { 
          return mapper.mapGlobalState(response.data.globals[0].currentSystemState)
        }
      )

      console.log('Mapped data:')
      console.log(liquityState)

    return liquityState
  }
}

export default DefaultDiscoveryService