import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    findJobs: (state) => {
        return state;
    }
  }
});

export const { } = UserSlice.actions;
export default UserSlice.reducer;
