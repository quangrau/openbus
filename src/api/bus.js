const TOKEN = '7112bc0aaec34f61b56d265e69359bc4';
const END_POINT = 'http://api.openfpt.vn/fbusinfo/businfo';

export function getBusStopsInBounds(from, to) {
  return fetch(`${END_POINT}/getstopsinbounds/${from.lng}/${from.lat}/${to.lng}/${to.lat}`)
    .then(response => response.json());
};
