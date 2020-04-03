import 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHamburger,
  faCopyright,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import './index.css';

library.add(faHamburger, faCopyright, faStar);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
