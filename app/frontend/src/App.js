import { useState, useEffect } from "react";

import api from "./api";

import './App.css';

function App() {
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    setError(false);

    if (search.length < 2) {
      setResults([]);
      return;
    }

    api.getLocationsByName(search)
      .then(data => setResults(data))
      .catch(() => setError(true))
  }, [search]);

  return (
    <div className="App">
      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search location.."
          value={search}
          onChange={({ target }) => setSearch(target.value)}
        />
      </div>
      <div className="results">
      {error
        ? <div>Something went wrong</div>
        : <ul className="list">
            {results.map((res, index) => (
              <li className="list__item" key={`${index}_${res.latitude}_${res.longitude}`}>
                {res.name} - {res.latitude} x {res.longitude}
              </li>
            ))}
          </ul>
      }
      </div>
    </div>
  );
}

export default App;
