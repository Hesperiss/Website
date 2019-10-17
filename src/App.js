import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Components/Login/Login';
import LandingPage from './Components/Landing/LandingPage';
// import Register from './Views/Register';
import Chat from './Components/Chat/View';
import Profile from './Components/Profile/Profile';
import Prescription from './Components/Prescription/View';
import Settings from './Components/Settings/Settings';
import Map from './Components/Map/Map';
import NotFound from './Components/Shared/404/NotFound';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                  <Switch>
                    <Route exact={true} path='/' component={LandingPage}/>
                    <Route exact={true} path='/login' component={Login}/>
                    <Route exact={true} path='/chat' component={Chat}/>
                    <Route exact={true} path='/map' component={Map}/>
                    <Route exact={true} path='/profile' component={Profile}/>
                    <Route exact={true} path='/prescription' component={Prescription}/>
                    <Route exact={true} path='/profile/settings' component={Settings}/>
                    <Route component={NotFound} />
                  </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
