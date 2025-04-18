import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    REMOVE_COMMENT,
    ADD_COMMENT,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import api from '../utils/api';

// Get posts
export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// GET_POST
export const getPost = (postId) => async (dispatch) => {
    try {
        const res = await api.get(`/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
    try {
        const res = await api.put(`/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
    try {
        const res = await api.put(`/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
    try {
        await api.delete(`/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId,
        });

        dispatch(setAlert(' Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await api.post('/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data,
        });

        dispatch(setAlert(' Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await api.post(`/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });

        dispatch(setAlert(' Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
    try {
        await api.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });

        dispatch(setAlert(' Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
