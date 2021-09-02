import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import homeStateReducer from './home/reducer'

export const store = configureStore({
  reducer: {
    homeState: homeStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch