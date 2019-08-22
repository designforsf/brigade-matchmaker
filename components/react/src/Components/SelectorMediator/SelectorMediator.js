import React from 'react';
import Selector from '../Selector';
import _ from 'lodash';

class SelectorMediator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: props.isLoaded,
      ...this.makeSkillsList(props.projects)
    };
  }

  makeSkillsList(projects) {
    return projects.map(project => project.attributes.matchingConfig)
      .reduce(
        (allProjects, nextProject) => _.mergeWith(allProjects, nextProject,
          (current, next) => (current || []).concat(next)
        ),
      {});
  }

  handleClick(category, interestOrSkill) {
    alert(category);
    alert(JSON.stringify(interestOrSkill));
  }

  tag(_category, interestOrSkill) {
    return interestOrSkill;
    // return <Tag text={interestOrSkill} click={() => this.handleClick(category, interestOrSkill)} />;
  }

  render() {
    var { error, isLoaded, interests, skillsNeeded, skillsOffered } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <h1>Selector</h1>
          <div className="row">
            {_.map({
              interest: interests,
              'skill-you-have': skillsNeeded,
              'skill-to-learn': skillsOffered
            }, (tags, title) =>
              <Selector tags={tags} title={title} key={title} />
            )}
          </div>
        </div>
      );
    }
  }
}

export default SelectorMediator;
