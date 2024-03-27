import './MedForm.scss';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    InputAdornment
} from '@mui/material';


export default function MedForm({
    handleSubmit,
    medData,
    setMedData,
    showDeleteButton,
    handleDeleteMed,
    showHistory,
    userId,
    error,
    customTheme,
    setSelectedTime1,
    selectedTime1,
    setSelectedTime2,
    selectedTime2
}) {

    const handleTimeChange1 = (time) => {
        setSelectedTime1(time);
    };

    const handleTimeChange2 = (time) => {
        setSelectedTime2(time);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'frequency') {
            setMedData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setMedData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <div className='med-form__container'>
            <ThemeProvider theme={customTheme}>
                <form className='med-form' onSubmit={handleSubmit}>
                    <div className='med-form__inputs'>
                        <TextField
                            type="text"
                            variant='outlined'
                            fullWidth
                            sx={{ mb: 3 }}
                            id="name"
                            placeholder="'Wellbutrin'"
                            htmlFor="name"
                            name="name"
                            label="Medication Name"
                            value={medData.name}
                            onChange={handleInputChange}
                            error={error.name} />

                        <TextField
                            type="text"
                            variant='outlined'
                            fullWidth
                            sx={{ mb: 3 }}
                            id="dose"
                            htmlFor="dose"
                            name="dose"
                            label="Strength"
                            value={medData.dose}
                            onChange={handleInputChange}
                            error={error.dose}
                            InputProps={{
                                endAdornment: <InputAdornment position="start">mg</InputAdornment>,
                            }} />

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="frequency">Frequency</InputLabel>
                            <Select
                                labelId="frequency"
                                id="frequency"
                                value={medData.frequency}
                                label="Frequency"
                                name="frequency"
                                onChange={handleInputChange}
                                error={error.frequency}
                            >
                                <MenuItem value="once-daily">Once Daily</MenuItem>
                                <MenuItem value="twice-daily">Twice Daily</MenuItem>
                            </Select>
                        </FormControl>

                        {medData.frequency === 'once-daily' && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    sx={{ width: '100%' }}
                                    margin="normal"
                                    label="Schedule"
                                    name="startTime"
                                    value={selectedTime1}
                                    onChange={handleTimeChange1}
                                    error={error.times} />
                            </LocalizationProvider>
                        )}
                        {medData.frequency === 'twice-daily' && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    sx={{ mb: 3, width: '100%' }}
                                    margin="normal"
                                    label="Schedule"
                                    name="startTime"
                                    value={selectedTime1}
                                    onChange={handleTimeChange1}
                                    error={error.times} />
                                <TimePicker
                                    sx={{ mb: 3, width: '100%' }}
                                    margin="normal"
                                    label="Schedule"
                                    name="startTime"
                                    value={selectedTime2}
                                    onChange={handleTimeChange2}
                                    error={error.times} />
                            </LocalizationProvider>
                        )}
                    </div>

                    <Button sx={{ my: 3, p: 1, borderRadius: 2, color: 'white', fontSize: 15 }} type="submit" variant='contained'>Save</Button>
                    {showHistory && (<Link className='med-form__card' to={`/${userId}/medications/${medData.name}/history`}><p>View History</p></Link>)}
                    {showDeleteButton && (<Button sx={{ my: 3, }} type="button" variant='contained' color='secondary' onClick={handleDeleteMed} className='med-form__button--delete'>Stop Medication</Button>)}
                </form>
            </ThemeProvider>
        </div>
    )
}
