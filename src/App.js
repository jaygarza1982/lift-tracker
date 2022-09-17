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
import Categories from './components/Categories';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Categories />} />
          <Route path='/exercises/:categoryId' element={<Exercises />} />
          <Route path='/lifts/:exerciseId' element={<Lifts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
