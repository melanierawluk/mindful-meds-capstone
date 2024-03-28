import './MedForm.scss';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import {
    Button,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    InputAdornment,
    Modal,
    Box,
    Typography,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 25,
    borderRadius: 4,
    p: 4,
};

const buttonStyle = {
    mt: 2,
    borderRadius: 2,
    fontSize: 13,
    height: '2.5rem',
    width: '100%',
    fontWeight: 'regular'
}


export default function MedForm({
    handleSubmit,
    medData,
    setMedData,
    showDeleteButton,
    handleStopMed,
    showHistory,
    userId,
    error,
    customTheme,
    setSelectedTime1,
    selectedTime1,
    setSelectedTime2,
    selectedTime2,
    openSaveSnackbar,
}) {

    // Throwing a value.idValid error - to pre-populate the times for existing meds
    // const medDataTime1 = dayjs(medData.times[0], 'h:mm A').toDate();
    // const medDataTime2 = dayjs(medData.times[1], 'h:mm A').toDate();

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    //  Close the modal on button click and trigger the Snackbar
    const handleStopMedLocal = () => {
        handleStopMed();
        setOpenSnackbar(true);
        handleClose();
    };

    const handleCloseSnackbar = () => {
        setTimeout(() => {
            setOpenSnackbar(false);
            navigate(`/${userId}/medications`);
        }, 2000)
    }

    // When Once Daily is selected
    const handleTimeChange1 = (time) => {
        setSelectedTime1(time);
    };

    // When Twice Daily is selected
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
                            sx={{ mb: 2 }}
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
                            sx={{ mb: 2 }}
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

                        <FormControl fullWidth sx={{ mb: 2 }}>
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
                                <MenuItem value="Once Daily">Once Daily</MenuItem>
                                <MenuItem value="Twice Daily">Twice Daily</MenuItem>
                            </Select>
                        </FormControl>

                        {medData.frequency === 'Once Daily' && (
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
                        {medData.frequency === 'Twice Daily' && (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    sx={{ mb: 2, width: '100%' }}
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

                    <Button sx={buttonStyle} type="submit" variant='contained' >Save</Button>

                    <Snackbar
                        open={openSaveSnackbar}
                        autoHideDuration={1000}
                        message={`Medication Saved`}
                        sx={{ mb: 10, mx: 3 }}
                    />

                    {showHistory && (<Link to={`/${userId}/medications/${medData.name}/history`}><Button sx={buttonStyle} variant='contained'>View History</Button></Link>)}
                    {showDeleteButton && (
                        <Button
                            sx={buttonStyle}
                            type="button"
                            variant='contained'
                            color='secondary'
                            onClick={handleOpen}
                            className='med-form__button--delete'>
                            Stop Medication
                        </Button>)}

                    {/* Modal to confirm is the user wants to stop the medication */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Stop Medication
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {`Are you sure you want to stop ${medData.name}?`}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                                <Button variant='contained' onClick={handleStopMedLocal}>Yes</Button>
                                <Button variant='contained' onClick={handleClose} color='secondary'>No</Button>
                            </Box>
                        </Box>
                    </Modal>

                    {/* Snackbar alert when medication is stopped */}
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={1000}
                        onClose={handleCloseSnackbar}
                        message={`Stopped ${medData.name}`}
                        sx={{ mb: 5, mx: 4 }}
                    />
                </form>
            </ThemeProvider>
        </div>
    )
}
