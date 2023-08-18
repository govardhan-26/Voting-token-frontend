import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import Navbar from './components/Admin/Navbar';
import Admin_dashboard from './components/Admin/Admin_dashboard';
import Create_election from './components/Admin/Create_election';
import {ElectionStateProvider, useElectioncreation} from './components/Context'
import Admin_register from './components/Register/Admin_register';
import Results from './components/Admin/Results/Results';
import Voter_register from './components/Register/Voter_register';
import Admin_Login from './components/Login/Admin_Login';
import Voter_Login from './components/Login/Voter_Login';
import Voter_list from './components/Admin/Voter_list/Voter_list';
import Dashboard from './components/Voter/Dashboard';
import Err_page from './components/Err_page';
import Elections from './components/Admin/Elections';
import Voter_Elections from './components/Voter/Elections';
import CandidateList from './components/Admin/Candidate_list/candidate_list';

function App() {
  

  return (
    <ElectionStateProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/admin_register' element={<Admin_register/>}/>
          <Route path='/admin_login' element={<Admin_Login/>}/>
          <Route path='/voter_login' element={<Voter_Login/>}/>
          <Route path='/voter_register' element={<Voter_register/>}/>
          <Route path='/admin_dashboard' element={<Admin_dashboard/>}/>
          <Route path='/voter_Dashboard' element={<Dashboard/>}/>
          <Route path='/Create_election' element={<Create_election/>}/>
          <Route path='/voter_list' element={<Voter_list/>}/>
          <Route path='/admin_Dashboard/elections/candidate_list' element={<CandidateList/>}/>
          <Route path='/Results' element={<Results/>}/>
          <Route path='*' element={<Err_page/>}/>
          <Route path='/voter_Dashboard/elections' element={<Voter_Elections/>}/>
          <Route path='/admin_dashboard/elections' element={<Elections/>}/>
      </Routes>    
    </BrowserRouter>
    </ElectionStateProvider>
  );
}

export default App;
