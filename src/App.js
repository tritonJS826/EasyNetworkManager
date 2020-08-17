import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

import NavMenu from './components/NavMenu';
import CurrentNetworkPage from './pages/CurrentNetworkPage';
import IPTablesPage from './pages/IPTablesPage';
import SingleMachinePage from './pages/SingleMachinePage';
import PATH from './constants/path';
import './App.css';

const App = () => {
  return (
    <div className="App">
    <BrowserRouter>
    <NavMenu />
    <Switch>
      <Route exact path={PATH.CURRENT_NETWORK} component={CurrentNetworkPage} />} />
      <Route exact path={PATH.SINGLE_MACHINE} component={SingleMachinePage} />
      <Route exact path={PATH.IP_TABLES} component={IPTablesPage} />
      <Redirect to={{ pathname: PATH.IP_TABLES }} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
