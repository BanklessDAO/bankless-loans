import LiquityState from "../../../../models/LiquityState";

/**
 * Abstract GraphQL response mapper.
 */
interface GraphQLAPIMapper {
  mapGlobalState(rawState: any): LiquityState
}

export default GraphQLAPIMapper