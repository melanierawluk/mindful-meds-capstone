import './Notes.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import * as dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
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
        setNoteContent({
            ...noteContent,
            note_content: event.target.value
        })
    }

    const submitNoteEdit = async (event) => {
        event.preventDefault();

        const updatedNote = {
            note_content: noteContent.note_content,
            date: formattedDate,
            id: noteContent.id
        }

        const newNote = {
            note_content: noteContent.note_content,
            date: formattedDate
        }

        try {
            if (noteContent.id) {
                await axios.patch(`${base_url}/notes/${userId}`, updatedNote);
            } else {
                await axios.post(`${base_url}/notes/${userId}`, newNote);

            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Header title='Notes' />
            <ThemeProvider theme={customTheme}>
                <section className='notes'>
                    <div className='notes__calendar'>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                views={['day']}
                                onChange={handleDateChange}
                                value={selectedDate}
                                autoFocus={false} />
                        </LocalizationProvider>
                    </div>
                    <div className='notes__container'>
                        <div className='notes__medications'>
                            <h4 className='notes__label'>MEDICATIONS</h4>
                            {medContent.length === 0 ? (<p className='notes__meds-list--none'>No meds logged</p>) :
                                (medContent.map((med) => {
                                    return (
                                        <div className='notes__meds-list'>
                                            <p className='notes__meds-list-item'>{medContent && med.name}</p>
                                            <p className='notes__meds-list-item'>{medContent && (`${med.dose} - ${med.frequency}`)}</p>
                                        </div>
                                    )
                                })
                                )}
                        </div>
                        <form action="submit">
                            <label className='notes__label'>NOTES</label>

                            <TextField
                                id="notes"
                                multiline
                                fullWidth
                                rows={2}
                                sx={{ mt: 1 }}
                                value={noteContent && noteContent.note_content}
                                onChange={handleNoteChange}
                            />
                            <Button sx={{ my: 3, p: 0.8, borderRadius: 2, color: 'white', fontSize: 15 }} type="submit" fullWidth onClick={submitNoteEdit} variant='contained'>Save</Button>
                        </form>
                    </div>
                </section >
            </ThemeProvider>
            <BottomNav />
        </>
    )
}