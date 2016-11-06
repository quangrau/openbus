import styles from './BusStopPredictions.scss';
import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import busBlueIcon from '../assets/images/bus_blue_icon.svg';

const toKm = (meters) => {
  if (!meters) return '?';

  const km = (meters / 1000);
  return `${km.toFixed(1)} km`;
};

const parseTime = (sec) => {
  const sec_num = parseInt(sec, 10);
  const hours   = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  const seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 0) return `${minutes} phút ${seconds} giây`;
  return `${hours} giờ ${minutes} phút`;
};

const BusInfo = ({ data }) => (
  <div className={`l-box pure-g ${styles.root_bus}`}>
    <div className="pure-u-1-5">
      <div className={styles.root_bus_icon}>
        <img src={busBlueIcon} />
      </div>
    </div>
    <div className="pure-u-3-5">
      <div className={styles.root_bus_number}>
        <div>Biển số <strong>{data.v}</strong></div>
        <div>
          <small>Trạm kế tiếp: còn </small>
          <small>{parseTime(data.t)}</small>
        </div>
      </div>
    </div>
    <div className="pure-u-1-5">
      <div className={styles.root_bus_d}>
        <small>{toKm(data.d)}</small>
      </div>
    </div>
  </div>
);

const BusStopPredictions = observer(({ predictions }) => {
  return (
    <div className={styles.root}>
      {predictions.map(data => (
        <div key={data.r} className={styles.item}>
          <div className={`l-box pure-g ${styles.root_r}`}>
            <div className="pure-u-1-5">
              <div className={styles.root_rNo}>{data.rNo}</div>
            </div>
            <div className="pure-u-4-5">
              <div className={styles.root_rN}>{data.rN}</div>
            </div>
          </div>

          {data.arrs.map((bus, index) => (
            <BusInfo key={index} data={bus} />
          ))}
        </div>
      ))}
    </div>
  );
});

BusStopPredictions.propTypes = {
  predictions: PropTypes.object,
};

export default BusStopPredictions;
