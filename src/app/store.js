import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import bookReducer from './../features/books';
import currentBookReducer from './../features/current_book';
import currentChapterReducer from './../features/current_chapter';
import verseReducer from './../features/verses';
import currentVerseReducer from './../features/current_verse';

export default configureStore({
  reducer: {
    counter: counterReducer,
    books: bookReducer,
    current_book: currentBookReducer,
    current_chapter: currentChapterReducer,
    current_verse: currentVerseReducer,
    verses: verseReducer
  },
});
