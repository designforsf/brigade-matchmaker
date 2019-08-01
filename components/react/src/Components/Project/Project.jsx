import React from 'react';
import Tag from '../Tag';

class Project extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      attributes: {
        name, description, slackChannel, todoItems, progressItems, matchingConfig:
        { interests, skillsNeeded, skillsOffered },
      },
    } = this.props;
    return (
      <div className="project">
        <div className="projectCols">
          <div className="projectCol1">
            <h5 className="projectTitle">{name}</h5>
            <p>{description}</p>
            <p className="contact"><strong>Contact Project</strong></p>
            <p><button className="contact-button" type="button">{slackChannel}</button></p>
          </div>
          <div className="projectCol2">
            <h5 className="skillsHeader">Project Needs & Interests</h5>

            <p className="skillsCategory"><strong>Skills Needed:</strong></p>
            <div className="tagContainer">
              { skillsNeeded.map(skill => <Tag name={skill} border="1px solid #AA193A" />) }
            </div>

            <p className="skillsCategory"><strong>Learning Opportunities:</strong></p>
            <div className="tagContainer">
              { skillsOffered.map(skill => <Tag name={skill} border="1px solid #AA193A" />) }
            </div>

            <p className="skillsCategory"><strong>Civic Interests:</strong></p>
            <div className="tagContainer">
              { interests.map(interest => <Tag name={interest} border="1px solid #AA193A" />) }
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
