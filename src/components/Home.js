import styles from './Home.scss';
import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import Map from './Map';

@observer
class Home extends Component {
  handleUpdateCenter(center, bounds) {
    const southWest = bounds.getSouthWest().toJSON();
    const northEast = bounds.getNorthEast().toJSON();

    this.props.appStore.updateCenter(center);
    this.props.appStore.getBusStops(southWest, northEast);
  }

  render() {
    const { appStore } = this.props;
    return (
      <div className={styles.root}>
        <Map
          center={appStore.center}
          busStops={appStore.busStops}
          onCenterChanged={this.handleUpdateCenter.bind(this)}
        />
      </div>
    );
  }
}

Home.propTypes = {
};

export default Home;
