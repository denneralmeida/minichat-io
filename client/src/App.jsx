import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import paths from './utils/paths';
import Login from './components/Login';
import Chat from './components/Chat';
import { SnackbarProvider } from 'notistack';

const App = () => (
  <SnackbarProvider dense maxSnack={5}>
    <Router>
      <Route path={paths.HOME} exact component={Login} />
      <Route path={paths.CHAT} exact component={Chat} />
    </Router>
  </SnackbarProvider>
);

export default App;
