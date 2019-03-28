import React from 'react';

class Project extends React.Component {
  render() {
    let { attributes: { description, name }  } = this.props;
    return (
      <div class="well">
        <h5>{name}</h5>
        {description}
      </div>
    );
  }
}

export default Project;
