import React, { PropTypes, Component } from 'react';
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

class Root extends Component {

  render() {
    return (
      <Router
        key={Math.random()}
        routes={routes}
        history={browserHistory}
      />
    );
  }
}

Root.propTypes = {
};

export default Root;
