import React, { useState } from 'react';
import _ from 'lodash';

const titleize = text => text.split('-').map(_.capitalize).join(' ');

const Tag = ({ text, click }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = text => {
    click && click(text);
    setClicked(!clicked);
  }

  return (
    <div className="tag {clicked && 'clicked'}" onClick={() => handleClick(text)}>
      {titleize(text)}
    </div>
  );
}

export default Tag;
