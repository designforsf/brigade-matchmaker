import React, { Component } from 'react';
import Header from './Components/Header';
import ProjectList from './Components/ProjectList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ProjectList />
      </div>
    );
  }
}

export default App;
