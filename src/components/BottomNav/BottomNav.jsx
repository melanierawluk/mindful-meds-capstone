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
            <Link to='/dashboard'>
                <HomeOutlinedIcon style={{ color: location.pathname === '/dashboard' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/medications'>
                <MedicationOutlinedIcon style={{ color: location.pathname === '/medications' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/add'>
                <AddIcon style={{ color: location.pathname === '/add' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/notes'>
                <EditNoteIcon style={{ color: location.pathname === '/notes' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/profile'>
                <AccountCircleOutlinedIcon style={{ color: location.pathname === '/profile' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
        </nav>
    )
}

