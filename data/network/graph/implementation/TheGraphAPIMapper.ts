import LiquityState from "../../../../models/LiquityState"
import GraphQLAPIMapper from "../interface/GraphQLAPIMapper"

/**
 * GraphQL mapper implementation accepting objects returned from the subgraph.
 */
class TheGraphAPIMapper implements GraphQLAPIMapper {
  mapGlobalState(rawState: any): LiquityState {
    console.log('Mapping: ' + rawState)

    try {
      return new LiquityState(
        Number.parseFloat(rawState.totalCollateral),
        Number.parseFloat(rawState.totalCollateralRatio),
        Number.parseFloat(rawState.totalLQTYTokensStaked),
        Number.parseFloat(rawState.tokensInStabilityPool),
        Number.parseFloat(rawState.price)
      )
    } catch {
      throw new Error("Mapping failed")
    }
  }
}

export default TheGraphAPIMapper