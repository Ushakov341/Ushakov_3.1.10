import { useEffect } from 'react';
import './App.css';
import { User } from './types';

const App = () => {
  const currentUser: User | null = null;
  const searchQuery = '';
  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?username=${searchQuery}`
      );
      const resJson = await response.json();
      console.log(resJson[0]);
    };

    fetchFunc();
  }, [searchQuery]);

  return (
    <div className="card">
      <input type="search" value={searchQuery} onChange={() => {}} />
      {currentUser ? (
        <div>
          <h3>{currentUser.name}</h3>
          <h3>{currentUser.username}</h3>
          <h3>{currentUser.email}</h3>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default App;
