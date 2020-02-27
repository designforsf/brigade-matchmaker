import React from "react";
import {
  faCalendar,
  faHeart,
  faHome,
  faInfoCircle,
  faPen,
  faRocket
} from "@fortawesome/free-solid-svg-icons";
import NavItem from "../NavItem";
import logo from "../../cfsf_logo.png";

const Header = () => {
  const headerItems = [
    {
      text: "Home",
      link: "https://codeforsanfrancisco.org/",
      icon: faHome
    },
    {
      text: "Events",
      link: "https://codeforsanfrancisco.org/events",
      icon: faCalendar
    },
    {
      text: "Blog",
      link: "https://codeforsanfrancisco.org/blog",
      icon: faPen
    },
    {
      text: "Projects",
      link: "https://codeforsanfrancisco.org/projects",
      icon: faRocket
    },
    {
      text: "Donate",
      link: "https://codeforsanfrancisco.org/donate",
      icon: faHeart
    },
    {
      text: "About",
      link: "https://codeforsanfrancisco.org/about",
      icon: faInfoCircle
    }
  ];

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" />
        </a>
        <ul className="navbar-collapse collapse">
          {headerItems.map((item, key) => (
            <NavItem key={key} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
