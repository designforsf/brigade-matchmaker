import React from 'react';
import Project from './Project';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:5455/api/projects')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.data);
          this.setState({
            isLoaded: true,
            projects: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, projects } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container well">
          <h1>Project List</h1>
          {projects.map((project, key) =>
            <Project key={key} {...project} />
          )}
        </div>
      );
    }
  }
}

export default ProjectList;
