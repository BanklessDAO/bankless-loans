import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import LiquityState from '../../models/LiquityState'
import DefaultServiceProvider from '../../services/DefaultServiceProvider'
import DefaultNetworkProvider from '../../data/network/DefaultNetworkProvider'

interface GlobalState {
  currentLiquityState: LiquityState | null
}

const initialState: GlobalState = {
  currentLiquityState: null
} as GlobalState

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setLiquityState: (state, action: PayloadAction<LiquityState>) => {
      state.currentLiquityState = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGlobalState.fulfilled, (state, action) => {
      // Add user to the state array
      state.currentLiquityState = action.payload
    })
  },
})

/*
  TODO: Keep the active Service references somethere else — this is a temp solution for this branch.
 */
const graphAPIClient = (new DefaultNetworkProvider()).graph()
const discoveryService = (new DefaultServiceProvider()).discovery(graphAPIClient)

const fetchGlobalState = createAsyncThunk(
  'fetchGlobalState',
  async () => {
    let liquityState = await discoveryService.getCurrentState()
    return liquityState
  }
)

export const { setLiquityState } = globalStateSlice.actions

export const currentLiquityState = (state: RootState) => state.globalState.currentLiquityState

export default globalStateSlice.reducer