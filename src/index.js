import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHamburger,
  faCheck,
  faCheckSquare,
  faCopyright,
  faStar,
  faSearch,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import './index.css';

library.add(
  faHamburger,
  faCopyright,
  faStar,
  faSearch,
  faCheckSquare,
  faCheck,
  faPlus
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
