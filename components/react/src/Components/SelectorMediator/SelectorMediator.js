import React, { useState }  from 'react';
import Selector from '../Selector';

const SelectorMediator = ({ setSelected, taxonomies }) => {

  const merger = (taxonomyId, selectedObjects) => {
    setSelected(selected => {
      selected[taxonomyId] = selectedObjects;
      return selected;
    })
  };

  return (
    <div className="container">
      <h1>Selector</h1>
      <div className="row">
        {taxonomies.map(taxonomy =>
          <Selector
            key={taxonomy.id}
            taxonomyId={taxonomy.id}
            addToMediator={selected => merger(taxonomy.id, selected)}
            {...taxonomy}
          />,
        )}
      </div>
    </div>
  );
}

export default SelectorMediator;
