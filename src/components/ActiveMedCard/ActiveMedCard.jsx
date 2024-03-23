import './ActiveMedCard.scss';
import { Link } from 'react-router-dom';


export default function MedCard({ med }) {

    return (
        <div className='med-card__active'>
            <div className='med-card__card--active'>
                <p>{med.name}</p>
            </div>
        </div>
    )
}