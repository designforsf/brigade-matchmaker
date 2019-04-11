import React from 'react';

class Project extends React.Component {
  render() {
    let {
      attributes: { name, description, todoItems, progressItems,
        matchingConfig: { interests, skillsNeeded, skillsOffered }
      }
    } = this.props;
    return (
      <div className="project" style={{border: "1px solid lightgray", boxShadow: "2px 3px 2px #ccc", padding: 16, margin: 8, marginBottom: 24}}>
      <div className="projectCols" style={{display: "grid", gridGap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderBottom: "1px solid lightgray"}}>
        <div className="projectCol1" style={{borderRight: "1px solid lightgray"}}>
          <h5 style={{fontSize: "1.5em", fontWeight: 600}}>{name}</h5>
          <p>{description}</p>
          <p><strong>Contact Project</strong></p>
          <p><a href="#">#channel</a></p>
        </div>
        <div className="projectCol2">
          <h5 style={{marginBottom: 24}}>Project Needs & Interests</h5>
          <p><strong>Skills Needed:</strong>
          {skillsNeeded.map(skill =>
            <li>{skill}</li>
            )}
          </p>
          <p><strong>Learning Opportunities:</strong>
            {skillsOffered.map(skill =>
              <li>{skill}</li>
            )}
          </p>
          <p><strong>Civic Interests:</strong>
            {interests.map(interest =>
              <li>{interest}</li>
            )}
          </p>
        </div>
      </div>
        <details>
          <summary style={{textDecoration: "underline"}}>Show project details</summary>
          <div className="details-grid" style={{display: "grid", gridGap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderBottom: "1px solid lightgray"}}>
            <ul style={{borderRight: "2px solid lightgray"}}><strong>Pending Tasks</strong></ul>
            <ul style={{borderRight: "2px solid lightgray"}}><strong>Progress Made</strong></ul>
            <div className="additional-info">
              <p style={{fontSize: "1em"}}><strong>Additional Info</strong></p>
            </div>
          </div>
        </details>
      </div>
    );
  }
}

export default Project;

