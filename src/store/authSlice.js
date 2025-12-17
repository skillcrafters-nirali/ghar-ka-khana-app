import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    isAuthLoading: true,
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log('action:', action);
      console.log('state', state);
      state.token = action.payload.token;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
    },
    restoreCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthLoading = false;
    },

    logout: state => {
      state.token = null; 
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthLoading = false;
    },
  },
});

export const { setCredentials, logout, restoreCredentials } = authSlice.actions;
export default authSlice.reducer;
