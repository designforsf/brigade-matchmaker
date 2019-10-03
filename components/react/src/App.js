import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import ProjectList from './Components/ProjectList';
import SelectorList from './Components/SelectorList';

const App = () => {
  const abortController = new AbortController();
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [taxonomies, setTaxonomies] = useState([]);
  const [error, setError] = useState();
  const [selected, setSelected] = useState({});
  const [matchScores, setMatchScores] = useState({});

  useEffect(
    () => request('projects', setProjects).then(() => request('taxonomies', setTaxonomies)).then(() => setIsLoaded(true)),
    [],
  );
  const request = (endpoint, setter) => {
    return fetch(`http://localhost:5455/${endpoint}.json`, { signal: abortController.signal })
      .then(result => result.json())
      .then(setter, handleFetchError);
  };

  const handleFetchError = error => {
    if (error.name === 'AbortError') return;
    setIsLoaded(true);
    setError(error);
  }

  const generateMatch = () => fetch(
    'http://localhost:5455/matches.json',
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taxonomies: selected }),
    },
  ).then(result => result.json()).then(setMatchScores, handleFetchError);

  if (error) { return <div className="App"><Header />Error: {error.message}</div>; }
  if (!isLoaded) { return <div className="App"><Header />Loading...</div>; }
  return (
    <div className="App">
      <Header />
      <SelectorList taxonomies={taxonomies} setSelected={setSelected} />
      <div className="container">
        <div className="card text-center">
          <div className="card-body">
            <button type="button" className="btn btn-danger" onClick={generateMatch}>Generate Match!</button>
          </div>
        </div>
      </div>
      <ProjectList projects={projects} matchScores={matchScores} />
    </div>
  );
}

export default App;
