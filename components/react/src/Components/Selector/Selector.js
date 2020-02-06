import React, { useState, useEffect } from 'react';
import SelectorModal from '../SelectorModal';
import Category from '../Category';
import Tag from '../Tag';
import _ from 'lodash';

const Selector = ({ categories, name, taxonomyId, addToMediator }) => {
  const [selected, setSelected] = useState([]);
  useEffect(() => addToMediator(selected.map(getTagId)));

  const selectorCategory = (categoryName, id) =>
    <Category categoryId={id} name={categoryName} click={() => removeCategoryFromSelected(id)} key={`category${id}`} />;
  const selectorTag = (tagName, id) =>
    <Tag tagId={id} name={tagName} click={() => removeTagFromSelected(id)} key={`tag${id}`} />;
  const modalCategory = category =>
    <Category categoryId={category.id} name={category.name} tags={category.tags} click={addToSelected} key={`category${category.id}`} />;

  const getTagId = tag => _.pick(tag.props, ['tagId', 'categoryId']);

  const addToSelected = (type, name, id) => {
    const tagToAdd = type === 'tag' ? selectorTag(name, id) : selectorCategory(name, id);
    setSelected(_.uniqBy([tagToAdd, ...selected], selectedItem => JSON.stringify(getTagId(selectedItem))));
  };

  const removeTagFromSelected = id => {
    setSelected(selected => selected.filter(tag => tag.props.tagId !== id));
  }
  const removeCategoryFromSelected = id => {
    setSelected(selected => selected.filter(category => category.props.categoryId !== id));
  }

  return (
    <div className="card">
      <div className="card-header text-center">
        <div className="selector-box">
          {name} <button data-toggle="modal" className="add-items" data-target={`#selector-modal-${taxonomyId}`}>Add Item</button>
        </div>
      </div>
      <div className="card-body">
        {selected}
        <SelectorModal categories={categories.map(modalCategory)} name={name} key={taxonomyId} taxonomyId={taxonomyId} />
      </div>
    </div>
  );
};

export default Selector;
