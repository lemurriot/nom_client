import 'dotenv'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faHamburger, faCopyright, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faHamburger, faCopyright, faStar)


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>, document.getElementById('root'))

serviceWorker.unregister()
