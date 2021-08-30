import LiquityState from "../../../../models/LiquityState"
import GraphQLAPIMapper from "../interface/GraphQLAPIMapper"

/**
 * GraphQL mapper implementation accepting objects returned from the subgraph.
 */
class TheGraphAPIMapper implements GraphQLAPIMapper {
  mapGlobalState(rawState: any): LiquityState {
    try {
      return new LiquityState(
        rawState.totalCollateral,
        rawState.totalCollateralRatio,
        rawState.totalLQTYTokensStakes,
        rawState.tokensInStabilityPool,
        rawState.price
      )
    } catch {
      throw new Error("Mapping failed")
    }
  }
}

export default TheGraphAPIMapper