import React from 'react';
import Tag from '../Tag';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderTag = this.renderTag.bind(this);
  }

  handleClick(e) {
    const clickedName = e.target.textContent;
    this.setState({
      name: clickedName,
    });
  }

  renderTag(skill) {
    const defaultBorder = '1px solid #AA193A';
    const clickedBorder = '1px solid lightgreen';

    if (skill === this.state.name) {
      return <Tag name={skill} border={clickedBorder} onClick={this.handleClick} />;
    }
    return <Tag name={skill} border={defaultBorder} onClick={this.handleClick} />;
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
            <p><button type="button">{slackChannel}</button></p>
          </div>
          <div className="projectCol2">
            <h5 className="skillsHeader">Project Needs & Interests</h5>

            <p className="skillsCategory"><strong>Skills Needed:</strong></p>
            <div className="tagContainer">
              { skillsNeeded.map(skill => this.renderTag(skill)) }
            </div>

            <p className="skillsCategory"><strong>Learning Opportunities:</strong></p>
            <div className="tagContainer">
              { skillsOffered.map(skill => this.renderTag(skill)) }
            </div>

            <p className="skillsCategory"><strong>Civic Interests:</strong></p>
            <div className="tagContainer">
              { interests.map(interest => this.renderTag(interest)) }
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
