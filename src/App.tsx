import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Admin_dashboard from './components/Dashboard/Admin_dashboard';
import Create_election from './components/Create_Election/Create_election';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Admin_dashboard/>}/>
          <Route path='/Create_election' element={<Create_election/>}/>
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
