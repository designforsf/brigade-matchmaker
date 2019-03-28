import React from 'react';

class Project extends React.Component {
  render() {
    let {
      attributes: { name, description, todoItems, progressItems,
        matchingConfig: { interests, skillsNeeded, skillsOffered }
      }
    } = this.props;
    return (
      <div className="project" style={{border: "1px solid gray", padding: 16, margin: 16}}>
      <div className="projectCols" style={{border: "1px solid gray", display: "grid", gridGap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", padding: 16}}>
        <div className="projectCol1" style={{borderRight: "1px solid gray"}}>
          <h5>{name}</h5>
          <p>{description}</p>
          <button>Contact Project Lead</button>
        </div>
        <div className="projectCol2">
          <h5>Project Needs & Interests</h5>
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
          <summary>Show project details</summary>
            <p>Pending Tasks
              {todoItems.map(item =>
                <li>{item}</li>
              )}
            </p>
            <p>Progress Made
              {progressItems.map(item =>
                <li>{item}</li>
              )}
            </p>
            <p>Additional Info</p>
        </details>
      </div>
    );
  }
}

export default Project;
