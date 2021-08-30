import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import globalStateReducer from './state/globalState'

const store = configureStore({
  reducer: {
    globalState: globalStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch