import React from 'react';
import Selector from '../Selector';

const SelectorMediator = ({ error, isLoaded, taxonomies }) => {
  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Selector</h1>
      <div className="row">
        {taxonomies.map(taxonomy => <Selector key={taxonomy.id} taxonomyId={taxonomy.id} {...taxonomy} />)}
      </div>
    </div>
  );
}

export default SelectorMediator;
