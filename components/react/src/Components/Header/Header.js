import React from 'react';
import NavItem from '../NavItem';
import { faCalendar, faHeart, faHome, faInfoCircle, faPen, faRocket } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  headerItems() {
    return [
      {
        text: 'Home',
        link: 'https://codeforsanfrancisco.org/',
        icon: faHome,
      },
      {
        text: 'Events',
        link: 'https://codeforsanfrancisco.org/events',
        icon: faCalendar,
      },
      {
        text: 'Blog',
        link: 'https://codeforsanfrancisco.org/blog',
        icon: faPen,
      },
      {
        text: 'Projects',
        link: 'https://codeforsanfrancisco.org/projects',
        icon: faRocket,
      },
      {
        text: 'Donate',
        link: 'https://codeforsanfrancisco.org/donate',
        icon: faHeart,
      },
      {
        text: 'About',
        link: 'https://codeforsanfrancisco.org/about',
        icon: faInfoCircle,
      },
    ]
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light">
        <ul className="navbar-collapse collapse">
          {this.headerItems().map((item, key) =>
            <NavItem key={key} { ...item } />
          )}
        </ul>
      </nav>
    );
  }
}

export default Header;
