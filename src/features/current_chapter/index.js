import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_VALUE = 0;

export const set_current_chapter = createAction("SET_CURRENT_CHAPTER");

export default createReducer(INITIAL_VALUE, {
  [set_current_chapter]: (state, action) => (action.payload),
});
