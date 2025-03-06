import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCallsAPI } from "../services/api";

export const fetchCalls = createAsyncThunk("calls/fetchCalls", async () => {
  return await fetchCallsAPI();
});

const callsSlice = createSlice({
  name: "calls",
  initialState: {
    calls: {results: []},
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.calls = action.payload;
      })
      .addCase(fetchCalls.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default callsSlice.reducer;