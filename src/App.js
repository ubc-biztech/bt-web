import React from 'react';
import Router from './components/Router'
import './app.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router />
    </div>
  );
}

export default App;
