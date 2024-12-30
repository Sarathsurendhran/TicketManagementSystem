import { createSlice } from "@reduxjs/toolkit";

export const authenticatedUserSlice = createSlice({
  name: "authenticated_user",
  initialState: {
    username: null,
    email: null,
    isAdmin: false,
  },
  reducers: {
    setUser: (state, action) => {
      const { username, email, isAdmin } = action.payload;
      state.username = username;
      state.email = email;
      state.isAdmin = isAdmin;
    },
  },
});

export const { setUser } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
