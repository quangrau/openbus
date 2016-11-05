import { observable } from 'mobx';
import { getBusStopsInBounds } from '../api/bus';

class AppStore {

  @observable busStops = [];
  @observable center = {
    lat: 0,
    lng: 0,
  };

  updateCenter(lat, lng) {
    this.center = { lat, lng };
  }

  addBusStop(busInfo) {
    this.busStops.push(busInfo);
  }

  updateBusStops(busStops) {
    this.busStops = busStops;
  }

  getBusStops() {
    const from = {
      lat: this.center.lat - 0.01,
      lng: this.center.lng - 0.01
    };
    const to = {
      lat: this.center.lat + 0.01,
      lng: this.center.lng + 0.01,
    };

    // Call API
    getBusStopsInBounds(from, to)
      .then(busStops => this.updateBusStops(busStops));
  }
}

const store = window.store = new AppStore;

export default store;
