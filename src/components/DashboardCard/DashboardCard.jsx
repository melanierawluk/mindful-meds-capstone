import './DashboardCard.scss';
import { Link } from 'react-router-dom';

export default function DashboardCard({ med }) {

    if (med.active === 1) {
        return (
            <Link to='/medications' className='dashboard-card__card'>
                <div>
                    <p>{med.name}</p>
                    <p>{med.dose}</p>
                    <p>{med.times}</p>
                </div>
            </Link>
        )

    }
}