import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NavItem extends React.Component {
  render() {
    let { link, icon, text } = this.props;
    return (
      <li className="nav-item" style={{ listStyle: "none" }}>
        <a className="nav-link" href={link}>
          <FontAwesomeIcon icon={icon} /> {text}
        </a>
      </li>
    );
  }
}

export default NavItem;
