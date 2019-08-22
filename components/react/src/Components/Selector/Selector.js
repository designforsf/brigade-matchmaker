import React, { useState } from 'react';
import SelectorModal from '../SelectorModal';
import Tag from '../Tag';

const Selector = ({ tags, title }) => {
  const [selected, setSelected] = useState([]);

  const addSkillOrInterest = (newSkillOrInterest) => setSelected(selected => [...selected, newSkillOrInterest]);

  return (
    <div className="col-sm card card-body bg-light">
      {selected.map(text => <Tag text={text} />)}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#selector-modal-' + title}>
        Add {title.split('-').join(' ')}
      </button>
      <SelectorModal tags={tags} title={title} handleClick={addSkillOrInterest} />
    </div>
  );
};

export default Selector;
