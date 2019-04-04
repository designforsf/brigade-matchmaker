import React, { Component } from 'react';
import Header from './Header';
import ProjectList from './ProjectList';

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
