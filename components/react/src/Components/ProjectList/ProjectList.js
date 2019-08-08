import React from 'react';
import Project from '../Project';
import _ from 'lodash';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      projects: props.projects,
    };
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
          {_.sortBy(projects, project => project.attributes.name).map((project, key) =>
            <Project key={key} {...project} />
          )}
        </div>
      );
    }
  }
}

export default ProjectList;
