import './LogMedModal.scss'
import { Modal, Box, Typography, Button, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';



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



export default function LogMedModal({ customTheme, sortedMeds, open, handleClose }) {


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
                    {Object.entries(sortedMeds).map(([time, meds]) => (
                        <div key={time} className='log-med-modal__card'>
                            <h3 className='log-med-modal__time'>{time}</h3>
                            <div className='log-med-modal__medications'>
                                {meds.map((med, index) => (
                                    <div key={index} className='log-med-modal__medication'>
                                        <p className='log-med-modal__medication-name'>{med.name}</p>
                                        <p className='log-med-modal__medication-dose'>{`${med.dose} mg`}</p>
                                    </div>
                                ))}
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