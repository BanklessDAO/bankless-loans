/**
 * Global Liquity protocol state.
 */
class LiquityState {
  readonly totalCollateral: number
  readonly totalCollateralRatio: number
  readonly totalLQTYTokensStaked: number
  readonly tokensInStabilityPool: number
  readonly ethPrice: number

  constructor(
    totalCollateral: number, 
    totalCollateralRatio: number, 
    totalLQTYTokensStaked: number, 
    tokensInStabilityPool: number,
    ethPrice: number
) {
    this.totalCollateral = totalCollateral
    this.totalCollateralRatio = totalCollateralRatio
    this.totalLQTYTokensStaked = totalLQTYTokensStaked
    this.tokensInStabilityPool = tokensInStabilityPool
    this.ethPrice = ethPrice
  }
}

export default LiquityState