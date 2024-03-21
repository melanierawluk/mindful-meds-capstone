import './BottomNav.scss';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotesIcon from '@mui/icons-material/Notes';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MedicationIcon from '@mui/icons-material/Medication';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { } from '@fortawesome/free-solid-svg-icons'

export default function BottomNav() {


    return (
        <nav className='bottom-nav'>
            {/* <FontAwesomeIcon icon="fa-solid fa-house" /> */}
            <HomeIcon style={{ color: '#4D4C4C', fontSize: '2.5rem' }} />
            <MedicationIcon style={{ color: '#4D4C4C', fontSize: '2.5rem' }} />
            <AddCircleIcon style={{ color: '#4D4C4C', fontSize: '2.5rem' }} />
            <NotesIcon style={{ color: '#4D4C4C', fontSize: '2.5rem' }} />
            <AccountCircleIcon style={{ color: '#4D4C4C', fontSize: '2.5rem' }} />
        </nav>
    )
}