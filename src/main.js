import "purecss/build/pure-min.css"
import "purecss/build/grids-responsive-min.css"
import "./main.css";

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';

const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewApp = require('./components/Root').default;

    render(
      <AppContainer>
        <Root />
      </AppContainer>,
      rootElement
    );
  });
}
