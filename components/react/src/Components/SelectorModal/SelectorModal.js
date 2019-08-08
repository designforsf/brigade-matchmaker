import React from 'react';
import Tag from '../Tag';
const _ = require('lodash');

const SelectorModal = ({ tags, title, handleClick }) => {
  return (
    <div className="modal fade" role="dialog" id={'selector-modal-' + title} tabIndex="-1" aria-labelledby={'title_' + title}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={'title_' + title}>Select {title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {_.uniq(_.values(_.flatten(_.values(tags)))).map(tag => <Tag text={tag} click={handleClick}  key={tag} />)}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectorModal;
