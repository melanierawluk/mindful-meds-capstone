import './Notes.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';



export default function Notes() {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <>
            <Header />
            <section className='notes'>
                <h1 className='notes__title'>Notes</h1>
                <div className='notes__calendar'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar views={['day']} />
                    </LocalizationProvider>
                </div>
                <div className='notes__container'>
                    <h4 className='notes__label'>MEDICATIONS</h4>
                    {/* Likely need to map over the returned meds taken on the date */}
                    <p className='notes__meds-list'></p>
                    <form action="submit">
                        <label className='notes__label'>NOTES</label>
                        <textarea className='notes__input'></textarea>
                        <button type='submit' className='notes__button'>Save</button>
                    </form>
                </div>
            </section>

            <BottomNav />
        </>
    )
}