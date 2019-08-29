import React, { Component } from 'react';
import Header from './Components/Header';
import ProjectList from './Components/ProjectList';
import SelectorMediator from './Components/SelectorMediator';

class App extends Component {
  abortController = new AbortController();

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      projects: [],
    };
  }

  componentDidMount() {
    this.request('http://localhost:5455/projects.json', 'projects').then(
      () => this.request('http://localhost:5455/taxonomies.json', 'taxonomies').then(
        () => this.setState(Object.assign({}, this.state, { isLoaded: true }))
    ))
  }

  request(url, stateVariable) {
    return fetch(url, { signal: this.abortController.signal })
      .then(result => result.json())
      .then(result => this.addResultToState(result, stateVariable), this.handleFetchError);
  }

  addResultToState(result, stateVariable) {
    this.setState(Object.assign({}, this.state, { [stateVariable]: result }));
  }

  handleFetchError(error) {
    if (error.name === 'AbortError') return;
    this.setState({ isLoaded: true, error });
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div className="App"><Header />Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="App"><Header />Loading...</div>;
    } else {
      return (
        <div className="App">
          <Header />
          <SelectorMediator {...this.state} />
          <ProjectList {...this.state} />
        </div>
      );
    }
  }
}

export default App;
