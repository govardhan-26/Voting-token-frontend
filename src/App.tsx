import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Admin_dashboard from './components/Dashboard/Admin_dashboard';
import Create_election from './components/Create_Election/Create_election';
import {ElectionStateProvider, useElectioncreation} from './components/Context'
import Voter_Login from './components/Voter_Login/Voter_Login';

function App() {
  

  return (
    <ElectionStateProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Admin_dashboard/>}/>
          <Route path='/Create_election' element={<Create_election/>}/>
          <Route path='/Voter_Login' element={<Voter_Login/>}/>
      </Routes>    
    </BrowserRouter>
    </ElectionStateProvider>
  );
}

export default App;
