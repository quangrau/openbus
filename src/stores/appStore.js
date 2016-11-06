import { action, observable, computed } from 'mobx';
import { getBusStopsInBounds, getPredictBusStop } from '../api/bus';

class AppStore {
  @observable isLoadPredictions = false;
  @observable isLoadBusStops = false;

  @observable selectedStopId = null;
  @observable predictions = [];
  @observable busStops = [];
  @observable center = {
    lat: 10.773984006,
    lng: 106.69545849,
  };

  updateCenter({ lat, lng }) {
    this.center = { lat, lng };
  }

  updateBusStops(busStops) {
    this.busStops = busStops;
  }

  updatePredictions(predictions) {
    this.predictions = predictions;
  }

  @computed get selectedBusStop() {
    return this.busStops.filter(bus => bus.StopId === this.selectedStopId)[0];
  }

  @action
  getBusStops(from, to) {
    const fromLatLng = {
      lat: from ? from.lat : this.center.lat - 0.01,
      lng: from ? from.lng : this.center.lng - 0.01
    };
    const toLatLng = {
      lat: to? to.lat : this.center.lat + 0.01,
      lng: to? to.lng : this.center.lng + 0.01,
    };

    // Update loading state
    this.isLoadBusStops = true;

    // Call API
    getBusStopsInBounds(fromLatLng, toLatLng)
      .then(action('getBusStops-callback',
        busStops => {
          this.updateBusStops(busStops);
          this.isLoadBusStops = false;
        }));
  }

  @action
  updateSelectedStopId(stopId) {
    this.selectedStopId = stopId;

    // Update loading state
    this.isLoadPredictions = true;

    // call API
    getPredictBusStop(stopId)
      .then(action('getPredictBusSto', predictions => {
        this.updatePredictions(predictions);
        this.isLoadPredictions = false;
      }));
  }
}

const store = window.store = new AppStore;

export default store;
