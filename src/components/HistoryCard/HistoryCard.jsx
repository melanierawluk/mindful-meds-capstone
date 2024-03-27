import './HistoryCard.scss';
import * as dayjs from 'dayjs';

export default function HistoryCard({ med }) {

    const formattedStartDate = dayjs(med.start_date).format('MM-DD-YYYY');
    const formattedEndDate = dayjs(med.end_date).format('MM-DD-YYYY');

    return (
        <section className='history-card'>
            <div className='history-card__card'>
                <p className='history-card__dates'>{formattedStartDate} - {formattedEndDate === 'Invalid Date' ? "PRESENT" : formattedEndDate}</p>
                <p className='history-card__content'>{`${med.dose} mg`} </p>

                <p className='history-card__content'> {med.frequency} </p>
                {med.times.map((time) => {
                    return (<p className='history-card__content'>{time}</p>)
                })}

            </div>
        </section >
    )
}