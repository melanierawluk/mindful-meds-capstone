import './InactiveMedCard.scss';
import { Link } from 'react-router-dom';


export default function MedCard({ medicationSchedule, med }) {


    return (
        <div className='med-card__active'>

            <div className='med-card__card--inactive'>
                <p>{med.name}</p>
            </div>
        </div>
    )

}