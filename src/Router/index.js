import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Middleware from '../Middleware/Middleware';

// page base
import Login from '../Views/Auth/Login';
import Register from '../Views/Auth/Register';
import NotFound from '../Views/Errors/NotFound';

// page Landing
import Home from '../Views/Landing/Home';
import Profil from '../Views/Landing/Profil';
import Informasi from '../Views/Landing/Informasi/Index';
import Gallery from '../Views/Landing/GallerySanggar/Index';

// admin
// import Dashboard from '../Views/Admin/Page/Dashboard';
import Iuran from '../Views/Admin/Page/Iuran/Index';
import IuranDetail from '../Views/Admin/Page/Iuran/Detail';
import Akun from '../Views/Admin/Page/Akun';
import Post from '../Views/Admin/Page/Post/Index';
import Form from '../Views/Admin/Page/Post/FormPost';
import Profile from '../Views/Admin/Page/Profile/Index';

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
        <Route exact path='/gallery'>
          <Gallery/>
        </Route>
        {/* <Route path='/dashboard'>
          <Middleware.Authenticate render={<Dashboard/>}/>
        </Route> */}
        <Route path='/iuran' exact>
          <Middleware.Authenticate role='Admin' render={<Iuran/>}/>
        </Route>
        <Route path='/iuran/:identifier'>
          <Middleware.Authenticate role='Admin'render={<IuranDetail/>}/>
        </Route>
        <Route path='/akun'>
          <Middleware.Authenticate role='Admin' render={<Akun/>}/>
        </Route>
        <Route path='/post' exact>
          <Middleware.Authenticate role='Admin' render={<Post/>}/>
        </Route>
        <Route path='/post/form' exact>
          <Middleware.Authenticate role='Admin' render={<Form/>}/>
        </Route>
        <Route path='/post/form' exact>
          <Middleware.Authenticate role='Admin' render={<Form/>}/>
        </Route>
        <Route path='/profile' exact>
          <Middleware.Authenticate role='General' render={<Profile/>}/>
        </Route>
        <Route path='/login'>
          <Middleware.Guest render={<Login/>}/>
        </Route>
        <Route path='/register'>
          <Middleware.Guest render={<Register/>}/>
        </Route>
        <Route path='*'>
          <NotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;