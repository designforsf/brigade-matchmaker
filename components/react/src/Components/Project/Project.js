import React from 'react';

class Project extends React.Component {
  render() {
    let {
      attributes: { name, description, slackChannel, todoItems, progressItems,
        matchingConfig: { interests, skillsNeeded, skillsOffered }
      }
    } = this.props;
    return (
      <div className="project"> 
      <div className="projectCols">
        <div className="projectCol1">
          <h5 className="projectTitle">{name}</h5>
          <p>{description}</p>
          <p><strong>Contact Project</strong></p>
          <p><a href="#">{slackChannel}</a></p>
        </div>
        <div className="projectCol2">
          <h5 className="skillsHeader">Project Needs & Interests</h5>

          <p className="skillsCategory"><strong>Skills Needed:</strong></p>
          <div className="tagContainer">
            {skillsNeeded.map(skill =>
              <div className="tag">{skill}</div>
              )}
          </div>

          <p className="skillsCategory"><strong>Learning Opportunities:</strong></p>
          <div className="tagContainer">
            {skillsOffered.map(skill =>
              <div className="tag">{skill}</div>
            )}
          </div>

          <p className="skillsCategory"><strong>Civic Interests:</strong></p>
          <div className="tagContainer">
            {interests.map(interest =>
              <div className="tag">{interest}</div>
            )}
          </div>
      
        </div>
      </div>
        <details>
          <summary>Show project details</summary>
          <div className="detailsGrid">
            <ul className="details"><strong>Pending Tasks</strong></ul>
            <ul className="details"><strong>Progress Made</strong></ul>
            <div className="additional-info">
              <p className="additionalInfo"><strong>Additional Info</strong></p>
            </div>
          </div>
        </details>
      </div>
    );
  }
}

export default Project;

