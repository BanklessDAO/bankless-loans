import LiquityState from '../../../models/LiquityState'
import { GraphQLAPIClient } from '../../../data/network/graph/interface/GraphQLAPIClient'

/**
 * Discovery service for global historical data consumption.
 */
interface DiscoveryService {
  readonly graphQLAPIClient: GraphQLAPIClient

  /**
   * Get the most recent state of the protocol.
   */
  getCurrentState(): Promise<LiquityState>
}

export default DiscoveryService