import React, { useState, useCallback } from 'react';
import SelectorModal from '../SelectorModal';
import Tag from '../Tag';
import _ from 'lodash';

const Selector = ({ categories, name, taxonomyId }) => {
  const [selected, setSelected] = useState([]);

  const selectorTag = (name, id) => <Tag text={name} click={() => removeFromSelected(id)} key={id} />;
  const modalTag = category =>
    category.tags.map(tag => <Tag text={tag.name} click={() => addToSelected(tag.name, tag.id)} key={tag.id} />);

  const addToSelected = (name, id) => {
    let tagToAdd = selectorTag(name, id);
    setSelected(_.uniqWith([tagToAdd, ...selected], tag => tag.key));
  };

  const removeFromSelected = id => {
    setSelected(selected.filter(tag => tag.id !== id));
  };



  return (
    <div className="col-sm card card-body bg-light">
      {selected}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#selector-modal-' + taxonomyId}>
        Add {name}
      </button>
      <SelectorModal tags={categories.flatMap(modalTag)} name={name} key={taxonomyId} taxonomyId={taxonomyId} />
    </div>
  );
};

export default Selector;
