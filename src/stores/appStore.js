import { action, observable } from 'mobx';
import { getBusStopsInBounds } from '../api/bus';

class AppStore {

  @observable busStops = [];
  @observable center = {
    lat: 0,
    lng: 0,
  };

  @action
  updateCenter({ lat, lng }) {
    this.center = { lat, lng };
  }

  @action
  addBusStop(busInfo) {
    this.busStops.push(busInfo);
  }

  updateBusStops(busStops) {
    this.busStops = busStops;
  }

  getBusStops(from, to) {
    const fromLatLng = {
      lat: from ? from.lat : this.center.lat - 0.01,
      lng: from ? from.lng : this.center.lng - 0.01
    };
    const toLatLng = {
      lat: to? to.lat : this.center.lat + 0.01,
      lng: to? to.lng : this.center.lng + 0.01,
    };

    // Call API
    getBusStopsInBounds(fromLatLng, toLatLng)
      .then(busStops => this.updateBusStops(busStops));
  }
}

const store = window.store = new AppStore;

export default store;
