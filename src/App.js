import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import MedList from './pages/MedList/MedList';
import AddNewMed from './pages/AddNewMed/AddNewMed';
import Notes from './pages/Notes/Notes';
import Profile from './pages/Profile/Profile';
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';

// Med detail and Med history modals?

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/medications' element={<MedList />} />
        <Route path='/add' element={<AddNewMed />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
