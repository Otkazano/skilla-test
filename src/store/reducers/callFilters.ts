import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_DATE_END, DEFAULT_DATE_START } from '../../services/constants';

interface CallFiltersState {
  date_start: string;
  date_end: string;
  in_out?: number;
  sort_by?: 'date' | 'duration';
  order: 'ASC' | 'DESC';
}

const initialState: CallFiltersState = {
  date_start: DEFAULT_DATE_START,
  date_end: DEFAULT_DATE_END,
  sort_by: undefined,
  order: 'DESC',
};

const callFiltersSlice = createSlice({
  name: 'callFilters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<CallFiltersState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setFilters } = callFiltersSlice.actions;
export default callFiltersSlice;
