import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Admin_dashboard from './components/Dashboard/Admin_dashboard';
import Create_election from './components/Create_Election/Create_election';
import {ElectionStateProvider, useElectioncreation} from './components/Context'
import Admin_register from './components/Register/Admin_register';
import Results from './components/Results/Results';
import Voter_register from './components/Register/Voter_register';
import Admin_Login from './components/Login/Admin_Login';
import Voter_list from './components/Voter_list/Voter_list';

function App() {
  

  return (
    <ElectionStateProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/admin_register' element={<Admin_register/>}/>
          <Route path='/admin_login' element={<Admin_Login/>}/>
          <Route path='/voter_register' element={<Voter_register/>}/>
          <Route path='/admin_dashboard' element={<Admin_dashboard/>}/>
          <Route path='/Create_election' element={<Create_election/>}/>
          <Route path='/voter_list' element={<Voter_list/>}/>
          <Route path='/Results' element={<Results/>}/>
      </Routes>    
    </BrowserRouter>
    </ElectionStateProvider>
  );
}

export default App;
