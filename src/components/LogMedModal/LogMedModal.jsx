import './LogMedModal.scss'
import { Modal, Box, Typography, Button, ThemeProvider } from '@mui/material';

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


export default function LogMedModal({ customTheme, sortedMeds, open, handleClose, selectedTime }) {

    // Iterate over all meds on the dashboard and add meds that match with the selected time to an array
    const medsBySelectedTime = [];
    Object.entries(sortedMeds).forEach(([time, med]) => {
        if (time === selectedTime) {
            medsBySelectedTime.push(...med)
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Log Medication
                    </Typography>

                    {medsBySelectedTime.map((med) => (
                        <div key={med.id} className='log-med-modal__card'>
                            {/* <h3 className='log-med-modal__time'>{med.time}</h3> */}
                            <div className='log-med-modal__medications'>
                                <div key={med.index} className='log-med-modal__medication'>
                                    {/* <Box sx={{ display: 'flex' }}> */}
                                    <p className='log-med-modal__medication-name'>{med.name}</p>
                                    <p className='log-med-modal__medication-dose'>{`${med.dose} mg`}</p>
                                    {/* </Box> */}
                                </div>

                            </div>

                        </div>

                    ))}

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                        <Button variant='contained' >Taken</Button>
                        <Button variant='contained' color='secondary'>Skipped</Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}
