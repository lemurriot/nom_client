import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCheckSquare,
  faStar,
  faSearch,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import 'normalize.css';
import ReactGA from 'react-ga';
import config from './config';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import './index.css';

library.add(faStar, faSearch, faCheckSquare, faCheck, faPlus);

ReactGA.initialize(config.GOOGLE_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
