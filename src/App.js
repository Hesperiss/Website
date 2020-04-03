import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Login/Login';
import LandingPage from './Components/Landing/LandingPage';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import Map from './Components/Map/Map';
import Home from './Components/Home/Home'
import NotFound from './Components/Shared/404/NotFound';

import CheckLogin from './Components/CheckLogin.js';


class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact={true} path='/landing' component={LandingPage} />
						<Route exact={true} path='/login' component={Login} />
						<Route exact={true} path='/register' component={Register} />
						<Route exact={true} path='/map' component={Map} />
						<Route exact={true} path='/profile' component={Profile} />
						<Route exact={true} path='/profile/settings' component={Settings} />
						<Route exact={true} path='/test' component={() => <CheckLogin path='/login' />} />
						<Route exact={true} path='/' component={Home} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
