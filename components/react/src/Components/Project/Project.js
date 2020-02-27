import React from 'react';
import Tag from '../Tag';

const Project = ({
  name,
  search,
  description,
  slack_channel,
  tasks,
  taxonomies,
  additional_info,
}) => {
  /* Empty div returned if no search match */
  if (name.toLowerCase().match(search.toLowerCase()) === null) return <></>;

  return (
    <div className="project">
      <div className="project-columns">
        <div className="project-column-1">
          <h5 className="project-title">{name}</h5>
          <p>{description}</p>
          <p>
            <strong>Contact Project</strong>
          </p>
          <p>
            <button className="contact-button" type="button">
              #{slack_channel}
            </button>
          </p>
        </div>
        <div className="project-column-2">
          <h5 className="skills-header">Project Needs &amp; Interests</h5>

          {taxonomies.map(taxonomy => (
            <div key={taxonomy.name}>
              <p className="skills-category">
                <strong>{taxonomy.name}:</strong>
              </p>
              <div className="tag-container">
                {taxonomy.tags.map(tag => (
                  <Tag tagId={tag.id} key={'tag' + tag.id} name={tag.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <details>
        <summary>Show project details</summary>
        <div className="detailsGrid">
          <ul className="details">
            <strong>Pending Tasks</strong>
            {tasks
              .filter(task => !task.completed)
              .map(task => (
                <li key={task.id}>{task.description}</li>
              ))}
          </ul>
          <ul className="details">
            <strong>Progress Made</strong>
            {tasks
              .filter(task => task.completed)
              .map(task => (
                <li key={task.id}>{task.description}</li>
              ))}
          </ul>
          <div className="additional-info">
            <strong>Additional Info</strong>
            <br />
            <p>{additional_info}</p>
          </div>
        </div>
      </details>
    </div>
  );
};

export default Project;
