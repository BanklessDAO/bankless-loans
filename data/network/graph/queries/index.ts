import { DocumentNode } from '@apollo/client/core'
import gql from 'graphql-tag';

const GLOBAL_STATE_QUERY: DocumentNode = gql`
  query {
    globals {
      currentSystemState {
        id
        price
        sequenceNumber
        totalCollateral
        totalCollateralRatio
        tokensInStabilityPool
        totalLQTYTokensStaked
      }
      liquidationCount
    }
  }
`

export {
  GLOBAL_STATE_QUERY
}
