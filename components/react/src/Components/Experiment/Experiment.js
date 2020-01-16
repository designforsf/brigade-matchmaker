import React from 'react';

const Experiment = () => {
  
  const addSelector = () => {
    return '';
  }

  return (
    <div className="experimental-selector">
      <div className="skills-to-contribute-box">
        Skills to Contribute <button onClick={addSelector} className="add-items">Add Items</button>
      </div>

      <div className="skills-to-learn-box">
        Learning Goals <button onClick={addSelector} className="add-items">Add Items</button>
      </div>

      <div className="civic-interests-box">
        Civic Interests <button onClick={addSelector} className="add-items">Add Items</button>
      </div>
    </div>
  )
}

export default Experiment;
