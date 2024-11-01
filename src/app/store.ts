import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { menuSlice } from "../features/menu/menuSlice"
import { basketSlice } from "../features/basket/basketSlice"
import { headerSlice } from "../features/header/headerSlice"

const rootReducer = combineSlices(menuSlice, basketSlice, headerSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
