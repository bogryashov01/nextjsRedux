import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { postReducer } from './slices/posts';

export function makeStore() {
  return configureStore({
    reducer: {
      post: postReducer,
    },
  });
}

export const store = makeStore();
export const wrapper = createWrapper(makeStore);
