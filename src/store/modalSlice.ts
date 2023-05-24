import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type Modal = {
  open: boolean;
};
const initialState: Modal = {
  open: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalToggler(state, action: PayloadAction<boolean>) {
      console.log("modalToggler", action);
      state.open = !state.open;
    },
  },
});
export const { modalToggler } = modalSlice.actions;

export default modalSlice.reducer;
