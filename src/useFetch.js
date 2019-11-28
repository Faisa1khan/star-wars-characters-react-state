import React, { useReducer } from 'react';
import { isFunction } from 'util';
import endpoint from './endpoint';

export const initialState = {
  result: null,
  loading: true,
  error: null,
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOADING':
      return {
        characters: [],
        loading: true,
        error: null,
      };
    case 'RESPONSE_COMPLETE':
      return {
        characters: action.payload.characters,
        loading: false,
        error: null,
      };
    case 'ERROR':
      return {
        characters: [],
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const fetchCharacters = disptach => {
  disptach({ type: 'LOADING' });
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response =>
      disptach({
        type: 'RESPONSE_COMPLETE',
        payload: { characters: response.characters },
      }),
    )
    .catch(error =>
      disptach({
        type: 'ERROR',
        payload: {
          error,
        },
      }),
    );
};

export const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = React.useCallback(
    action => {
      console.log(action);

      if (isFunction(action)) {
        action(dispatch);
        console.log('if isFucntion is called');
      } else {
        dispatch(action);
        console.log('else is called');
      }
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
};
