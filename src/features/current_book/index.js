import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_VALUE = {};

export const set_current_book = createAction("SET_CURRENT_BOOK");

export default createReducer(INITIAL_VALUE, {
  [set_current_book]: (state, action) => ({ ...action.payload }),
});
