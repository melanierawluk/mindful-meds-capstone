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
    const [content, setContent] = useState({ note_content: '' });
    const [medContent, setMedContent] = useState();
    const [noteContent, setNoteContent] = useState();

    // Need to fix: date needs to be selected twice before data 

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await axios.get(`${base_url}/user/${userId}/notes/${formattedDate}`);
                // setContent(response.data[0])
                console.log('Response:', response.data); // Log the response data
                setContent(response.data[0]); // Assuming there's only one note per date
                console.log('Content:', content); // Log the content state
            } catch (error) {
                console.log(error)
            }
        }
        getNotes();

        // Need to fix: first render after selecting date has returnedArr empty
    }, [selectedDate])

    // Handle the changed date
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleNoteChange = (event) => {
        setNoteContent(event.target.value)
        console.log(event.target.value)
    }

    const filteredNoteArr = [];
    if (content && content.length > 0) {
        content.map((obj) => {
            filteredNoteArr.push(obj.note_content)
        })
    }

    const noteArr = [...new Set(filteredNoteArr)]

    console.log(`filteredArr: ${noteArr}`)

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
            <Header />
            <section className='notes'>
                <h1 className='notes__title'>Notes</h1>
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
                    <h4 className='notes__label'>MEDICATIONS</h4>
                    <form action="submit">
                        <label className='notes__label'>NOTES</label>
                        <textarea
                            className='notes__input'
                            // value={content.note_content}
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