import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Middleware from '../Middleware/Middleware';

// page base
import Login from '../Views/Auth/Login';
import NotFound from '../Views/Errors/NotFound';

// page Landing
import Home from '../Views/Landing/Home';
import Profil from '../Views/Landing/Profil';
import Informasi from '../Views/Landing/Informasi/Index';

function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/profil'>
          <Profil/>
        </Route>
        <Route exact path='/informasi'>
          <Informasi/>
        </Route>
        {/* <Route path='/list'>
          <Middleware.Authenticate render={<Listdata/>}/>
        </Route> */}
        <Route path='/login'>
          <Middleware.Guest render={<Login/>}/>
        </Route>
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;