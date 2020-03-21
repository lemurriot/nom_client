import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faHamburger,
  faCopyright,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import './index.css';

library.add(faHome, faHamburger, faCopyright, faStar);
const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={history}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
