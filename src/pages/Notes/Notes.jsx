import './Notes.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import * as dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Notes({ customTheme }) {

    const base_url = process.env.REACT_APP_BASE_URL;
    const { userId } = useParams();

    // Keep track of the users selected date
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const formattedDate = selectedDate.format('YYYY-MM-DD');

    // Hold the notes and meds data returned from database
    const [medContent, setMedContent] = useState([]);
    const [noteContent, setNoteContent] = useState();


    useEffect(() => {
        const getNotesAndMedsByDate = async () => {
            try {
                // GET notes on selected date
                const notesResponse = await axios.get(`${base_url}/notes/${userId}/${formattedDate}`);
                setNoteContent(notesResponse.data);

                // GET active meds on selected date
                const medsResponse = await axios.get(`${base_url}/meds/${userId}/date/${formattedDate}`);
                setMedContent(medsResponse.data);
            } catch (error) {
                console.log(error);
                // Check if the error is 404 (not found), if so, set noteContent to an empty string
                if (error.response && error.response.status === 404) {
                    setNoteContent("");
                    setMedContent([]);
                }
            }
        };

        getNotesAndMedsByDate();
    }, [selectedDate]);


    // Handle the changed date
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setNoteContent("")
    };

    const handleNoteChange = (event) => {
        setNoteContent(event.target.value)
        console.log(event.target.value)
    }

    function submitNoteEdit(event) {
        event.preventDefault();

        const updatedNote = {
            note_content: noteContent
        }

        const updateNote = async () => {
            try {
                await axios.patch(`${base_url}/${userId}/notes/`, updatedNote);

            } catch (error) {
                console.log(error)
            }
        }
        updateNote();
    }


    return (
        <>
            <Header title='Notes' />
            <section className='notes'>
                <div className='notes__calendar'>
                    <ThemeProvider theme={customTheme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                views={['day']}
                                onChange={handleDateChange}
                                value={selectedDate} />
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>

                <div className='notes__container'>
                    <div className='notes__medications'>
                        <h4 className='notes__label'>MEDICATIONS</h4>
                        {medContent.map((med) => {
                            return (
                                <div>
                                    <p>{medContent && med.name}</p>
                                    <p>{medContent && (`${med.dose} - ${med.frequency}`)}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                    <form action="submit">
                        <label className='notes__label'>NOTES</label>
                        <textarea
                            className='notes__input'
                            value={noteContent && noteContent.note_content}
                            onChange={handleNoteChange}
                        />
                        {/* <button type='submit' className='notes__button' onClick={handleNoteEdit}>Save</button> */}
                        <button type='submit' className='notes__button' onClick={submitNoteEdit}>Save</button>

                    </form>
                </div>
            </section>

            <BottomNav />
        </>
    )
}