import styles from './Header.scss';
import React, { PropTypes } from 'react';
import busIcon from '../assets/images/bus_icon.svg';

const Header = (props) => {
  return (
    <div className={`${styles.root} pure-menu pure-menu-horizontal`}>
      <a href="/" className={`${styles.icon} pure-menu-heading`}>
        <img src={busIcon} alt="VNBUS" width={24} />
      </a>
      <ul className="pure-menu-list">
        <li className="pure-menu-item">
          <a>Vnbus</a>
        </li>
      </ul>
    </div>
  );
};

Header.propTypes = {

};

export default Header;
