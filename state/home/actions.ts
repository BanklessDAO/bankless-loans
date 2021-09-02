import { createAsyncThunk } from '@reduxjs/toolkit'
import DefaultServiceProvider from '../../services/DefaultServiceProvider'
import DefaultNetworkProvider from '../../data/network/DefaultNetworkProvider'

/*
  TODO: Keep the active Service references somethere else.
 */
const graphAPIClient = (new DefaultNetworkProvider()).graph()
const discoveryService = (new DefaultServiceProvider()).discovery(graphAPIClient)

export const fetchHomeState = createAsyncThunk(
  'homeState/fetch',
  async () => {
    return await discoveryService.getCurrentState()
  }
)