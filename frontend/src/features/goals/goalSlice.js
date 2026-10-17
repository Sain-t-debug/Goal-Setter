import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';
import { logout } from '../auth/authSlice';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || error.toString();

// Each thunk reads the token from the auth slice and sends it as a Bearer header.
// A 401 means the token expired or is invalid, so we log the user out.
const handleError = (error, thunkAPI) => {
  if (error.response?.status === 401) thunkAPI.dispatch(logout());
  return thunkAPI.rejectWithValue(getErrorMessage(error));
};

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoals(token);
  } catch (error) {
    return handleError(error, thunkAPI);
  }
});

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.createGoal(goalData, token);
  } catch (error) {
    return handleError(error, thunkAPI);
  }
});

export const updateGoal = createAsyncThunk('goals/update', async ({ id, text }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.updateGoal(id, { text }, token);
  } catch (error) {
    return handleError(error, thunkAPI);
  }
});

export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.deleteGoal(id, token);
  } catch (error) {
    return handleError(error, thunkAPI);
  }
});

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.goals = state.goals.map((g) => (g._id === action.payload._id ? action.payload : g));
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((g) => g._id !== action.payload.id);
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      // Clear goals when the user logs out so the next user never sees them
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
