import './BottomNav.scss';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotesIcon from '@mui/icons-material/Notes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MedicationIcon from '@mui/icons-material/Medication';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const location = useLocation();

    return (
        <nav className='bottom-nav'>
            <Link to='/1/dashboard'>
                <HomeIcon style={{ color: location.pathname === '/dashboard/1' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/medications'>
                <MedicationIcon style={{ color: location.pathname === '/medications/1' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/add'>
                <AddCircleIcon style={{ color: location.pathname === '/add/1' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/notes'>
                <NotesIcon style={{ color: location.pathname === '/notes/1' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
            <Link to='/1/profile'>
                <AccountCircleIcon style={{ color: location.pathname === '/profile/1' ? '#7ECED8' : '#4D4C4C', fontSize: '2.5rem' }} />
            </Link>
        </nav>
    )
}

