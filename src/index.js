import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  useThunkReducer,
  reducer,
  initialState,
  fetchCharacters,
} from './useFetch';
import CharacterList from './CharacterList';
import CharacterView from './CharacterView';
import './styles.scss';

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  const { characters } = state;

  useEffect(() => {
    dispatch(dispatch => {});
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchCharacters)}>
            fetch Characters
          </button>
          <CharacterList characters={characters} />
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
