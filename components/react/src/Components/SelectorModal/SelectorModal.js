import React from 'react';

const SelectorModal = ({ categories, name, taxonomyId }) => {
  return (
    <div className="modal fade" role="dialog" id={'selector-modal-' + taxonomyId} tabIndex="-1" aria-labelledby={'title_' + taxonomyId}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={'title_' + taxonomyId}>Select {name}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {categories}
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectorModal;
