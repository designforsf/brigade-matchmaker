import React, { useState } from 'react';
import _ from 'lodash';

const Tag = ({ text, click }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = text => {
    click && click(text);
    setClicked(!clicked);
  }

  return (
    <div className="tag {clicked && 'clicked'}" onClick={() => handleClick(text)}>
      {text}
    </div>
  );
}

export default Tag;
