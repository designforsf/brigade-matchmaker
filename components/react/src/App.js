import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import ProjectList from './Components/ProjectList';
import SelectorList from './Components/SelectorList';

const App = () => {
  const abortController = new AbortController();
  const ApiUrl = process.env.API_URL || 'http://localhost:5455/api';
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

  const request = async (endpoint, setter) => {
    try {
      const response = await fetch(`${ApiUrl}/${endpoint}.json`, { signal: abortController.signal })
      const json = await response.json();
      setter(json)
    } catch (fetchError) {
      handleFetchError(fetchError);
    }
  };

  const handleFetchError = error => {
    if (error.name === 'AbortError') return;
    setIsLoaded(true);
    setError(error);
  }

  const generateMatch = () => fetch(
    `${ApiUrl}/matches.json`,
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
            <button type="button" className="btn btn-primary" onClick={generateMatch}>Generate Match!</button>
          </div>
        </div>
      </div>
      <ProjectList projects={projects} matchScores={matchScores} />
    </div>
  );
}

export default App;
