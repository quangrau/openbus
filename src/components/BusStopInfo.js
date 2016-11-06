import styles from './BusStopInfo.scss';
import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import BusStopPredictions from './BusStopPredictions';

const Loader = () => (
 <div className={`l-box text-center ${styles.loader}`}>Loading...</div>
);

const BusStopInfo = observer(({ busStop, predictions, isLoadPredictions }) => {
  if (!busStop) return <div className={styles.empty} />;

  const fullAddress = [busStop.AddressNo, busStop.Street, busStop.Ward, busStop.Zone]
    .filter(data => data)
    .join(', ');

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className="pure-g">
          <div className="pure-u-3-4">
            <div className="l-box">
              <div className={styles.header_name}>
                <span>{`${busStop.StopType}: [${busStop.Code}] ${busStop.Name}`}</span>
              </div>
              <small className={styles.header_address}>{fullAddress}</small>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className="l-box">
              <div className={styles.header_code}>
                <small>{busStop.Status}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        {isLoadPredictions
          ? <Loader />
          : <BusStopPredictions predictions={predictions} />
        }
      </div>
    </div>
  );
});

BusStopInfo.propTypes = {
  busStop: PropTypes.any,
};

export default BusStopInfo;
