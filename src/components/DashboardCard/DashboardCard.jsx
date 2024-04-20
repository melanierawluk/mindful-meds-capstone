import { Link } from 'react-router-dom';
import './DashboardCard.scss';
import LogMedModal from '../LogMedModal/LogMedModal';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from 'react';


export default function DashboardCard({ activeMedArr, customTheme }) {

    const [selectedTime, setSelectedTime] = useState();
    const [verified, setVerified] = useState(false);


    const handleCardClick = (time) => {
        setSelectedTime(time)
        setOpen(true)
    }

    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // GROUP BY TIME
    function groupMedicationsByTime(medications) {
        const groupedMeds = {};

        medications.forEach(med => {
            med.times.forEach(time => {
                if (!groupedMeds[time]) {
                    groupedMeds[time] = [];
                }
                groupedMeds[time].push(med);
            });
        });
        return groupedMeds
    }

    // invoke the grouping function 
    const groupedMeds = groupMedicationsByTime(activeMedArr)


    // SORT BY TIME (AM -> PM)
    function sortMedicationsByTime() {
        const timeKeys = Object.keys(groupedMeds);
        timeKeys.sort((a, b) => {
            const [aHour, aMinute, aPeriod] = a.split(/:| /);
            const [bHour, bMinute, bPeriod] = b.split(/:| /);

            const a24Hour = aPeriod === 'AM' ? parseInt(aHour, 10) % 12 : (parseInt(aHour, 10) % 12) + 12;
            const b24Hour = bPeriod === 'AM' ? parseInt(bHour, 10) % 12 : (parseInt(bHour, 10) % 12) + 12;

            if (a24Hour !== b24Hour) {
                return a24Hour - b24Hour;
            }

            return parseInt(aMinute, 10) - parseInt(bMinute, 10);
        });

        const sortedMeds = {};
        timeKeys.forEach(time => {
            sortedMeds[time] = groupedMeds[time];
        });
        return sortedMeds
    }

    // invoke the sorting function
    const sortedMeds = sortMedicationsByTime(groupedMeds)

    // Iterate over all meds on the dashboard and add meds that match with the selected time to an array
    const medsBySelectedTime = [];
    Object.entries(sortedMeds).forEach(([time, med]) => {
        if (time === selectedTime) {
            medsBySelectedTime.push(...med)
        }
    })

    // Click handlers for modal buttons
    const handleLogMed = () => {
        setVerified(true);
        handleClose(true);
    }

    const handleSkipMed = () => {
        setVerified(false);
        handleClose(true);
    }

    return (

        <div className='dashboard-card__container'>
            {Object.entries(sortedMeds).map(([time, meds]) => (
                <div onClick={() => handleCardClick(time)} key={time} className='dashboard-card__card'>
                    <h3 className='dashboard-card__time'>{time}</h3>
                    <div className='dashboard-card__medications'>
                        {meds.map((med, index) => (
                            <div key={index} className='dashboard-card__medication'>
                                {verified && (<VerifiedIcon className='dashboard-card__medication-icon' sx={{ color: '#FFB0AF', fontSize: '2rem' }} />)}
                                <p className='dashboard-card__medication-name'>{med.name}</p>
                                <p className='dashboard-card__medication-dose'>{`${med.dose} mg`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <LogMedModal customTheme={customTheme}
                sortedMeds={sortedMeds}
                open={open}
                handleClose={handleClose}
                time={sortedMeds.time}
                selectedTime={selectedTime}
                setVerified={setVerified}
                handleLogMed={handleLogMed}
                handleSkipMed={handleSkipMed}
                medsBySelectedTime={medsBySelectedTime}
            />
        </div>

    );
}
