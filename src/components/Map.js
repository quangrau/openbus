import styles from './Map.scss';
import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import BUS from '../constants/bus';
import mapStyle from '../constants/mapStyle.json';
import busStopIcon from '../assets/images/bus_stop.svg';
import busStationIcon from '../assets/images/bus_station.svg';

const RootMap = withGoogleMap(({ center, markers }) => {
  return (
    <GoogleMap
      defaultZoom={15}
      options={{
        styles: mapStyle,
        mapTypeControl: false,
        streetViewControl: false,
      }}
      center={{ lat: center.lat, lng: center.lng }}
    >
      {markers}
      {center && (
        <Marker
          position={center}
        />
      )}
    </GoogleMap>
  );
});

@observer
class Map extends Component {
  handleMarkerClick(busId, marker) {
    console.log(busId, marker.latLng);
  }

  render() {
    const { center, busStops } = this.props;

    console.log(center);

    const markers = busStops.map(bus => (
      <Marker
        key={bus.StopId}
        content={bus.Name}
        position={{ lat: bus.Lat, lng: bus.Lng }}
        icon={bus.StopType === BUS.TYPE_STOP
          ? busStopIcon
          : busStationIcon
        }
        onClick={this.handleMarkerClick.bind(this, bus.StopId)}
      />
    ));

    return (
      <div className={styles.root}>
        <RootMap
          containerElement={
            <div className={styles.container} />
          }
          mapElement={
            <div className={styles.element} />
          }
          center={center}
          content="I'm here!"
          markers={markers}
        />
      </div>
    );
  }
}

Map.propTypes = {
  center: PropTypes.object,
  busStops: PropTypes.object,
};

export default Map;
