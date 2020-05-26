import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_VALUE = [];

export const fetch_verses = createAction("FETCH_VERSES");

export default createReducer(INITIAL_VALUE, {
  [fetch_verses]: (state, action) => [...action.payload],
});
