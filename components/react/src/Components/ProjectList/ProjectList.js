import React from 'react';
import Project from '../Project';
import _ from 'lodash';

const ProjectList = ({ projects }) => {
  return (
    <div className="container well">
      <h1>Project List</h1>
      {_.sortBy(projects, project => project.name).map((project, key) =>
        <Project key={key} {...project} />
      )}
    </div>
  );
};

export default ProjectList;
