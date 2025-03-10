import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CallFiltersState {
  date_start: string;
  date_end: string;
  in_out?: number | undefined;
  sort_by: undefined | 'date' | 'duration';
  order: 'ASC' | 'DESC';
}

const initialState: CallFiltersState = {
  date_start: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  date_end: new Date().toISOString().split('T')[0],
  sort_by: undefined,
  order: 'DESC',
};

const callFiltersSlice = createSlice({
  name: 'callFilters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<CallFiltersState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilters } = callFiltersSlice.actions;
export default callFiltersSlice;
