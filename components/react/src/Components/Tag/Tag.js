import React from 'react';

class Tag extends React.Component {
  
  constructor(props) {
    super(props)
    this.state={
      selected: false,
      border: "1px solid #AA193A"
    }
  }

  handleClick = () => {
    this.setState({ selected: true,
                    border: '1px solid green' });
  }

  render() { 
    return (
      <button className="tag" onClick={this.handleClick} style={{border: this.state.border}}> 
        {this.props.name}
      </button>
    );
  }
}

Tag.defaultProps = {
  border: '1px solid #AA193A'
};

export default Tag;
