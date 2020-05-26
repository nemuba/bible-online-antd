import {createAction, createReducer} from '@reduxjs/toolkit';

const INITIAL_VALUE = [];

export const fetch_books = createAction("FETCH_BOOKS");

export default createReducer(INITIAL_VALUE,{
  [fetch_books]: (state, action)=> [...action.payload]
});