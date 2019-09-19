import React from 'react';
import Selector from '../Selector';
import Tag from '../Tag';
import _ from 'lodash';

class SelectorMediator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(interestOrSkill) {
    alert(JSON.stringify(interestOrSkill));
  }


  render() {
    var { error, isLoaded, taxonomies } = this.props;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <h1>Selector</h1>
          <div className="row">
            {taxonomies.map(taxonomy => <Selector key={taxonomy.id} taxonomyId={taxonomy.id} {...taxonomy} />)}
          </div>
        </div>
      );
    }
  }
}

export default SelectorMediator;
