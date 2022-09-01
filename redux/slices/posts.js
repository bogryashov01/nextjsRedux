import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const postState = {
  pending: false,
  posts: null,
  currentPost: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState: postState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        posts: action.payload.post.posts,
        currentPost: action.payload.post.currentPost,
      };
    },
  },
});

export const { setPosts, setCurrentPost } = postSlice.actions;

const postsData = (state) => state.post.posts;
const currentPost = (state) => state.post.currentPost;

export const postData = { postsData, currentPost };

export const postReducer = postSlice.reducer;
