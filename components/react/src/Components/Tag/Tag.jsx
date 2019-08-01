import React from 'react';

class Tag extends React.Component {
  
  render() { 
    return (
      <button className="tag" onClick={this.props.onClick} style={{border: this.props.border}}> 
        {this.props.name}
      </button>
    );
  }
}

Tag.defaultProps = {
  border: '1px solid #AA193A'
};

export default Tag;
