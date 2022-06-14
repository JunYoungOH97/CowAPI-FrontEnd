import React from 'react';

import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import {Dashboard} from './dashboard.js';
import {AI} from './AI.js';
import {Nav} from './Nav.js';

function App() {
  return (
    <Router>
      <Nav />

      <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/ai' element={<AI />} />
      </Routes>
    </Router>
  );
}

export default App;
