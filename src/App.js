import React from 'react';

import './App.css';
import './bulma.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Lifts from './components/Lifts';
import Exercises from './components/Exercises';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Exercises />} />
          <Route path='/lifts/:exerciseId' element={<Lifts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
