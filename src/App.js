import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './Components/Landing/LandingPage';
import Map from './Components/Map/Map';
import Home from './Components/Home/Home'
import NotFound from './Components/Shared/404/NotFound';
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";


class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact={true} path='/' component={Home} />
						<Route exact={true} path='/map' component={Map} />
						<Route exact={true} path='/landing' component={LandingPage} />
						<Route exact={true} path='/privacy-policy' component={PrivacyPolicy}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
