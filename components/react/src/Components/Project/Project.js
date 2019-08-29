import React from 'react';
import Tag from '../Tag';

class Project extends React.Component {
  render() {
    let {
      attributes: { name, description, slackChannel, todoItems, progressItems,
        matchingConfig: { interests, skillsNeeded, skillsOffered }
      }
    } = this.props;
    return (
      <div className="project">
      <div className="project-grid">
        <div className="project-column-left">
          <h5 className="project-title">{name}</h5>
          <p>{description}</p>
          <p className="contact"><strong>Contact Project</strong></p>
          <div className="contact"><button className="contact-button" type="button">{slackChannel}</button></div>
        </div>
        <div className="project-column-right">
          <h5 className="skills-header">Project Needs & Interests</h5>

          <p className="skills-category"><strong>Skills Needed:</strong></p>
          <div className="tag-container">
            {skillsNeeded.map(skill =>
              <Tag key={skill} text={skill} />
              )}
          </div>

          <p className="skills-category"><strong>Learning Opportunities:</strong></p>
          <div className="tag-container">
            {skillsOffered.map(skill =>
              <div className="tag" key={skill}>{skill}</div>
            )}
          </div>

          <p className="skills-category"><strong>Civic Interests:</strong></p>
          <div className="tag-container">
            {interests.map(interest =>
              <div className="tag" key={interest}>{interest}</div>
            )}
          </div>

        </div>
      </div>
        <details>
          <summary>Show project details</summary>
          <div className="details-grid">
            <ul className="details"><strong>Pending Tasks</strong>
              {todoItems.map(todoItem => <li key={todoItem}>{todoItem}</li>)}
            </ul>
            <ul className="details"><strong>Progress Made</strong>
              {progressItems.map(progressItem => <li key={progressItem}>{progressItem}</li>)}
            </ul>
            <div className="additional-info">
              <p className="additional-info"><strong>Additional Info</strong></p>
            </div>
          </div>
        </details>
      </div>
    );
  }
}

export default Project;
