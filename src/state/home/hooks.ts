import type { RootState } from '../index'

// TODO: Map it from the home state instead of the root state
export const selectLiquityState = (state: RootState) => state.homeState.currentLiquityState