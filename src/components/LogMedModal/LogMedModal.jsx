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


export default function LogMedModal({ customTheme,
    sortedMeds,
    open,
    handleClose,
    selectedTime,
    handleLogMed,
    handleSkipMed,
    medsBySelectedTime
}) {


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
                            <div className='log-med-modal__medications'>
                                <div key={med.index} className='log-med-modal__medication'>
                                    <p className='log-med-modal__medication-name'>{med.name}</p>
                                    <p className='log-med-modal__medication-dose'>{`${med.dose} mg`}</p>
                                </div>

                            </div>

                        </div>

                    ))}

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
                        <Button variant='contained' onClick={handleLogMed}>Taken</Button>
                        <Button variant='contained' color='secondary' onClick={handleSkipMed}>Skipped</Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    )
}
