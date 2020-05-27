import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_VALUE = {};

export const set_current_verse = createAction("SET_CURRENT_VERSE");

export default createReducer(INITIAL_VALUE, {
  [set_current_verse]: (state, action) => ({...action.payload}),
});
