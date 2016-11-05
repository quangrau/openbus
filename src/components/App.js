import styles from './App.scss';
import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import appStore from '../stores/appStore';
import Header from './Header';
import Footer from './Footer';

const geolocation = (
  navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

@observer
class App extends Component {

  componentDidMount() {
    geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords);
      // Update current location
      appStore.updateCenter({ lat: coords.latitude, lng: coords.longitude });
      // Load busStops nearby
      appStore.getBusStops();
    }, (reason) => {
      console.log(`Error: The Geolocation service failed (${reason}).`);
    });

  }

  render() {
    return (
      <div className={styles.root}>
        <Header />
        <div className={styles.main}>
          {React.cloneElement(this.props.children, { appStore })}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
