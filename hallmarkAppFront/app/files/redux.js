import { Platform } from 'react-native';

const API = Platform.OS === 'android'
  ? 'http://10.0.3.2:3000' // works for Genymotion
  : 'http://localhost:3000';

export const apiMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case 'GET_MOVIE_DATA':

      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_MOVIE_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}/data`)
        .then(response => {
            return response.json()
          }
        )
        .then(data => {
          next({
          type: 'GET_MOVIE_DATA_RECEIVED',
          data
        })})
        .catch(error => next({
          type: 'GET_MOVIE_DATA_ERROR',
          error
        }));
      break;
    case 'GET_USER_DATA':

      // Dispatch GET_MOVIE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_MOVIE_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}/data`)
        .then(response => {
            return response.json()
          }
        )
        .then(data => {
          next({
          type: 'GET_MOVIE_DATA_RECEIVED',
          data
        })})
        .catch(error => next({
          type: 'GET_MOVIE_DATA_ERROR',
          error
        }));
      break;

    // Do nothing if the action does not interest us
    default:
      break;
  }
};

export const reducer = (state = { measureTypes: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_MOVIE_DATA_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_MOVIE_DATA_RECEIVED':
      return {
        loading: false,             // set loading to false
        measureTypes: action.data.measureTypes, // update movies array with reponse data
      };
    case 'GET_MOVIE_DATA_ERROR':
      return state;
    default:
      return state;
    }
};
