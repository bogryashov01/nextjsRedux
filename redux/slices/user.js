import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const userState = {
  pending: false,
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        data: action.payload.user.data,
      };
    },
  },
});

export const { setUsers } = userSlice.actions;

export const usersData = (state) => state.user.data;

export const userReducer = userSlice.reducer;
