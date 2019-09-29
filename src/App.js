import React from 'react';
import Home from './components/Home'
import { Button } from 'carbon-components-react';
import './app.scss';

function App() {
  return (
    <div className="App">
      <Home />
      <Button>Button</Button>
    </div>
  );
}

export default App;
