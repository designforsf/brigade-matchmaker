import React, { useState } from 'react';
import Tag from '../Tag';

const Category = ({ categoryId, name, tags, click }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    click && click('category', name, categoryId);
    setClicked(!clicked);
  };

  return (
    <div>
      <div className="tag {clicked && 'clicked'}">
        <h4 onClick={handleClick}>{name}</h4>
        {tags && tags.map(tag => <Tag tagId={tag.id} name={tag.name} click={click} key={'tag' + tag.id} />)}
      </div>
    </div>
  );
}

export default Category;
