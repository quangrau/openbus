import styles from './Footer.scss';
import React, { PropTypes } from 'react';

const Footer = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.menu}>
        <div className="pure-g">
          <div className={`${styles.menu_item} pure-u-1-2`}><p>Thirds</p></div>
          <div className={`${styles.menu_item} pure-u-1-2`}><p>Thirds</p></div>
        </div>
        <div className={styles.button}>
          A
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {

};

export default Footer;
