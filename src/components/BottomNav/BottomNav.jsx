import './BottomNav.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const location = useLocation();

    return (
        <nav className='bottom-nav'>
            <Link to='/1/dashboard'>
                <HomeOutlinedIcon style={{ color: location.pathname === '/1/dashboard' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/medications'>
                <MedicationOutlinedIcon style={{ color: location.pathname === '/1/medications' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/add'>
                <AddIcon style={{ color: location.pathname === '/1/add' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/notes'>
                <EditNoteIcon style={{ color: location.pathname === '/1/notes' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/profile'>
                <AccountCircleOutlinedIcon style={{ color: location.pathname === '/1/profile' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
        </nav>
    )
}

