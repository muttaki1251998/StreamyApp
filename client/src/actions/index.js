import streams from '../apis/streams';
import { CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from './types';
import createBrowserHistory from '../history';

export const signIn = (userId) => {
  return {
    type: 'SIGN_IN',
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
}

// RESTFUL ROUTING // 

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data })
    
    // Do some programmatic navigation
    // to get the user to the home page
    // after stream creation
    createBrowserHistory.push('/');
  }
}

export const fetchStream = (id) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({ type: FETCH_STREAM, payload: response.data });
  }
}

export const fetchStreams = () => {
  return async (dispatch) => {
    const response = await streams.get('/streams');
    dispatch({ type:  FETCH_STREAMS, payload: response.data });
  }
} 

export const editStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({ type: EDIT_STREAM, payload: response.data });
    createBrowserHistory.push('/');
  }
}

export const deleteStream = (id) => {
  return async (dispatch) => {
    await  streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    createBrowserHistory.push('/');
  }
}