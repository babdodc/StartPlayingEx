import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { spellApi } from './services/spell'


export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [spellApi.reducerPath]: spellApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spellApi.middleware),
})



export type AppDispatch = typeof store.dispatch;

export default store;