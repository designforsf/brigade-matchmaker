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
    fetch('http://localhost:5455/api/projects', { signal: this.abortController.signal })
      .then(res => res.json())
      .then(
        result => {
          this.setState(
            Object.assign({},
              this.state,
              { isLoaded: true, projects: result.data }
            )
          );
        },
        error => {
          if(error.name === 'AbortError') return;
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
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
