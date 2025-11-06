import { useEffect, useReducer } from 'react';
import './App.css';
import { User } from './types';

type State = {
  searchQuery: string;
  currentUser: User | null;
};

type Action =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_USER'; payload: User | null };

const initialState: State = {
  searchQuery: '',
  currentUser: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchFunc = async () => {
      if (!state.searchQuery) {
        dispatch({ type: 'SET_USER', payload: null });
        return;
      }

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${state.searchQuery}`
      );
      const resJson = await response.json();

      if (resJson.length > 0) {
        dispatch({ type: 'SET_USER', payload: resJson[0] });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    };

    fetchFunc();
  }, [state.searchQuery]);

  return (
    <div className="card">
      <input
        type="search"
        value={state.searchQuery}
        onChange={(e) =>
          dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
        }
      />
      {state.currentUser ? (
        <div>
          <h3>{state.currentUser.name}</h3>
          <h3>{state.currentUser.username}</h3>
          <h3>{state.currentUser.email}</h3>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default App;
