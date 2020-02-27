import React, { useState } from "react";

const Tag = ({ name, click, tagId }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    click && click("tag", name, tagId);
    setClicked(!clicked);
  };

  return (
    <div className="tag {clicked && 'clicked'}" onClick={handleClick}>
      {name}
    </div>
  );
};

export default Tag;
