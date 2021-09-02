import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LiquityState from '../../../models/LiquityState'
import { fetchHomeState } from './actions'

export interface HomeState {
  currentLiquityState: LiquityState | null
}

const initialState: HomeState = {
  currentLiquityState: null
} as HomeState

const homeState = createSlice({
  name: 'homeState',
  initialState,
  reducers: {
    setLiquityState: (state, action: PayloadAction<LiquityState>) => {
      state.currentLiquityState = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeState.fulfilled, (state, action) => {
      state.currentLiquityState = action.payload
    })
  },
})

export const { setLiquityState } = homeState.actions

export default homeState.reducer