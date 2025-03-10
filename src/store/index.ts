import { configureStore } from '@reduxjs/toolkit';
import { callsSlice } from './reducers/calls';
import callFiltersSlice from './reducers/callFilters';

const store = configureStore({
  reducer: {
    calls: callsSlice.reducer,
    callFilters: callFiltersSlice.reducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
