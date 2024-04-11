import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import MedList from './pages/MedList/MedList';
import AddNewMed from './pages/AddNewMed/AddNewMed';
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
import MedDetails from './pages/MedDetails/MedDetails';
import MedHistory from './pages/MedHistory/MedHistory';
import { createTheme } from '@mui/material/styles';
import Frame from './components/Frame/Frame';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#7ECED8',
      },
      secondary: {
        main: '#FFB0AF',
      },
    },
  });

  return (

    <BrowserRouter>
      <Frame />
      <Routes>
        <Route path='/login' element={<Login customTheme={customTheme} />} />
        <Route path='/register' element={<Register customTheme={customTheme} />} />
        <Route path='/dashboard' element={<Dashboard customTheme={customTheme} />} />
        <Route path='/medications' element={<MedList customTheme={customTheme} />} />
        <Route path='/medications/:medId' element={<MedDetails customTheme={customTheme} />} />
        <Route path='/medications/:medName/history' element={<MedHistory customTheme={customTheme} />} />
        <Route path='/add' element={<AddNewMed customTheme={customTheme} />} />
        <Route path='/notes' element={<Notes customTheme={customTheme} />} />
        <Route path='/profile' element={<Profile customTheme={customTheme} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
