import './InactiveMedCard.scss';


export default function MedCard({ med }) {

    return (
        <article className='med-card__active'>
            <div className='med-card__card--inactive'>
                <p>{med.name}</p>
            </div>
        </article>
    )
}