import React, { useState } from 'react';

const intialState = {
  result: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOADING':
      return {
        result: null,
        loading: true,
        error: null,
      };
    case 'RESPONSE_COMPLETE':
      return {
        result: action.payload.response,
        loading: false,
        error: null,
      };
    case 'ERROR':
      return {
        result: null,
        loading: false,
        error: action.payload.error,
      };
  }
  return state;
};

export const useFetch = url => {
  const [state, dispatch] = React.useReducer(fetchReducer, intialState);

  React.useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: { error } });
      }
    };

    fetchUrl();

    //   dispatch({
    //     type: 'LOADING',
    //   });
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(response => {
    //       dispatch({ type: 'RESPONSE_COMPLETE', payload: { response } });
    //     })
    //     .catch(error => {
    //       dispatch({ type: 'ERROR', payload: { error } });
    //     });
  }, [url]);

  const { result, loading, error } = state;
  return [result, loading, error];
};
