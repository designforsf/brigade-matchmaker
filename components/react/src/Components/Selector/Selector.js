import React, { useState } from 'react';
import SelectorModal from '../SelectorModal';
import Category from '../Category';
import Tag from '../Tag';
import _ from 'lodash';

const Selector = ({ categories, name, taxonomyId }) => {
  const [selected, setSelected] = useState([]);

  const selectorCategory = (categoryName, id) =>
    <Category categoryId={id} name={categoryName} click={() => removeCategoryFromSelected(id)} key={'category' + id} />;
  const selectorTag = (tagName, id) =>
    <Tag tagId={id} name={tagName} click={() => removeTagFromSelected(id)} key={'tag' + id} />;
  const modalCategory = category =>
    <Category categoryId={category.id} name={category.name} tags={category.tags} click={addToSelected} key={`category${category.id}`} />;

  const getTagId = tag => JSON.stringify(_.pick(tag.props, ['tagId', 'categoryId']));

  const addToSelected = (type, name, id) => {
    const tagToAdd = type === 'tag' ? selectorTag(name, id) : selectorCategory(name, id);
    setSelected(_.uniqBy([tagToAdd, ...selected], getTagId));
  };

  const removeTagFromSelected = id => setSelected(selected.filter(tag => tag.props.tagId !== id));
  const removeCategoryFromSelected = id => setSelected(selected.filter(category => category.props.categoryId !== id));

  return (
    <div className="col-sm card card-body bg-light">
      {selected}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#selector-modal-' + taxonomyId}>
        Add {name}
      </button>
      <SelectorModal categories={categories.map(modalCategory)} name={name} key={taxonomyId} taxonomyId={taxonomyId} />
    </div>
  );
};

export default Selector;
