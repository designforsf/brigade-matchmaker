import React from 'react';
import Tag from '../Tag';

const Project = ({ name, description, slack_channel, tasks, taxonomies, additional_info }) => {
  return (
    <div className="project">
      <div className="projectCols">
        <div className="projectCol1">
          <h5 className="projectTitle">{name}</h5>
          <p>{description}</p>
          <p><strong>Contact Project</strong></p>
          <p><button className="contact-button" type="button">#{slack_channel}</button></p>
        </div>
        <div className="projectCol2">
          <h5 className="skillsHeader">Project Needs &amp; Interests</h5>

          {taxonomies.map(taxonomy =>
            <div key={taxonomy.name}>
              <p className="skillsCategory"><strong>{taxonomy.name}:</strong></p>
              <div className="tagContainer">
                {taxonomy.tags.map(tag =>
                  <Tag tagId={tag.id} key={'tag' + tag.id} name={tag.name} />
                )}
              </div>
            </div>
          )}


        </div>
      </div>
      <details>
        <summary>Show project details</summary>
        <div className="detailsGrid">
          <ul className="details"><strong>Pending Tasks</strong>
            {tasks.filter(task => !task.completed).map(task => <li key={task.id}>{task.description}</li>)}
          </ul>
          <ul className="details"><strong>Progress Made</strong>
            {tasks.filter(task => task.completed).map(task => <li key={task.id}>{task.description}</li>)}
          </ul>
          <div className="additional-info">
            <strong>Additional Info</strong><br />
            <p>{additional_info}</p>
          </div>
        </div>
      </details>
    </div>
  );
}

export default Project;
