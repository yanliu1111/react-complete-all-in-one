import {action, computed, createStore, thunk} from 'easy-peasy';

import api from './api/posts';

export default createStore({
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: '',
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: '',
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: '',
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: '',
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  search: '',
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: computed((state) => {
    return state.posts.filter(post =>
      post.body.toLowerCase().includes(state.search.toLowerCase()) ||
      post.title.toLowerCase().includes(state.search.toLowerCase())
    ).reverse();
  }),
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  
  postCount: computed((state) => {
    return state.posts.length;
  }),
  getPostById: computed((state) => {
    return (id) => state.posts.find(post => (post.id).toString() === id);
  }),
  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState();
    try {
          const response = await api.post('/post', newPost);
          actions.setPosts([...posts, response.data]);
          actions.setPostTitle('');
          actions.setPostBody('');
        } catch (error) {
          console.error('Failed to create new post:', error);
        }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();
    try {
      await api.delete(`/post/${id}`);
      actions.setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }),
  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState();
    try {
      const response = await api.put(`/post/${updatedPost.id}`, updatedPost);
      actions.setPosts(posts.map(post => (post.id === updatedPost.id ? response.data : post)));
      actions.setEditTitle('');
      actions.setEditBody('');
    } catch (error) {
      console.error('Failed to update post:', error);
      actions.setEditTitle(''); // Reset fields even if the update fails
      actions.setEditBody('');
    }
  }),
})