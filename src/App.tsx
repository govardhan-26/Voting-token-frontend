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
import Votenow from './components/Voter/Votenow';
import Vote from './components/Voter/Vote';
import VResults from './components/Voter/Results';
import Landing_Page from './components/Landing_Page';
import Result from './components/Admin/Results/Result'
import VResult from './components/Voter/Result'

function App() {
  

  return (
    <ElectionStateProvider>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Landing_Page/>}/>
          <Route path='/admin_register' element={<Admin_register/>}/>
          <Route path='/admin_login' element={<Admin_Login/>}/>
          <Route path='/voter_login' element={<Voter_Login/>}/>
          <Route path='/voter_register' element={<Voter_register/>}/>
          <Route path='/admin_dashboard' element={<Admin_dashboard/>}/>
          <Route path='/voter_Dashboard' element={<Dashboard/>}/>
          <Route path='/Create_election' element={<Create_election/>}/>
          <Route path="/admin_dashboard/elections/:Election_id/voter_list" element={<Voter_list />} />
          <Route path='/admin_dashboard/elections/:Election_id/candidate_list' element={<CandidateList/>}/>
          <Route path='/admin_dashboard/Results' element={<Results/>}/>
          <Route path='/admin_dashboard/Results/:Election_id/Result' element={<Result/>}/>
          <Route path='/voter_dashboard/Results/:Election_id/Result' element={<VResult/>}/>
          <Route path='*' element={<Err_page/>}/>
          <Route path='/voter_Dashboard/elections' element={<Voter_Elections/>}/>
          <Route path='/voter_Dashboard/votenow' element={ <Votenow/> }/>
          <Route path='/voter_dashboard/elections/:Election_id/Vote' element={<Vote/>}/>
          <Route path='/admin_dashboard/elections' element={<Elections/>}/>
          <Route path='/voter_dashboard/Results' element={<VResults/>}/>
      </Routes>    
    </BrowserRouter>
    </ElectionStateProvider>
  );
}

export default App;
