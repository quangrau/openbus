import styles from './Home.scss';
import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import Map from './Map';

@observer
class Home extends Component {

  handleLoadBusStops() {
    console.log('clicked');
    this.props.appStore.getBusStops();
  }


  render() {
    const { appStore } = this.props;

    return (
      <div className={styles.root}>
        <Map
          center={appStore.center}
          busStops={appStore.busStops}
        />
      </div>
    );
  }
}

Home.propTypes = {
};

export default Home;
