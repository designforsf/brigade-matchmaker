import React  from 'react';
import Project from '../Project';
import _ from 'lodash';

const ProjectList = ({ projects, matchScores }) => {
  const sortBy = project => [-(matchScores[project.id] || 0), project.name];
  return (
    <div className="container well">
      {_.sortBy(projects, sortBy).map((project, key) =>
        <Project key={key} {...project} />
      )}
    </div>
  );
};

export default ProjectList;
