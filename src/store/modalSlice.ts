import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Modal } from "./const";

const initialState: Modal = {
  open: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // открыть закрыть (true / false) модальное окно
    modalToggler(state, action: PayloadAction<boolean>) {
      console.log("modalToggler", action);
      state.open = !state.open;
    },
  },
});
export const { modalToggler } = modalSlice.actions;

export default modalSlice.reducer;
