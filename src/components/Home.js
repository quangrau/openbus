import styles from './Home.scss';
import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import Map from './Map';
import BusStopInfo from './BusStopInfo';

@observer
class Home extends Component {
  handleUpdateCenter(center, bounds) {
    const southWest = bounds.getSouthWest().toJSON();
    const northEast = bounds.getNorthEast().toJSON();

    this.props.appStore.updateCenter(center);
    this.props.appStore.getBusStops(southWest, northEast);
  }

  handleBusStopSelected(stopId, marker) {
    this.props.appStore.updateSelectedStopId(stopId);
  }

  render() {
    const { appStore } = this.props;

    return (
      <div className={styles.root}>
        <Map
          center={appStore.center}
          busStops={appStore.busStops}
          onCenterChanged={this.handleUpdateCenter.bind(this)}
          onBusStopSelected={this.handleBusStopSelected.bind(this)}
        />

        <BusStopInfo
          busStop={appStore.selectedBusStop}
          predictions={appStore.predictions}
        />
      </div>
    );
  }
}

Home.propTypes = {
};

export default Home;
