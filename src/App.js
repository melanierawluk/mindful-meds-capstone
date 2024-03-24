import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import MedList from './pages/MedList/MedList';
import AddNewMed from './pages/AddNewMed/AddNewMed';
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
// import Header from './components/Header/Header';
// import BottomNav from './components/BottomNav/BottomNav';
import { createTheme } from '@mui/material/styles';



// Med detail and Med history modals?

function App() {

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#FFB0AF',
      },
      secondary: {
        main: '#FFB0AF',
      },
    },
  });
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/:userId' element={<Dashboard />} />
        <Route path='/medications/:userId' element={<MedList />} />
        <Route path='/add/:userId' element={<AddNewMed />} />
        <Route path='/notes/:userId' element={<Notes customTheme={customTheme} />} />
        <Route path='/profile/:userId' element={<Profile />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
