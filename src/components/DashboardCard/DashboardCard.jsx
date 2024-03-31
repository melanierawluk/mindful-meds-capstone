import './DashboardCard.scss';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from 'react';

export default function DashboardCard({ activeMedArr }) {

    // For logging meds taken
    const [logged, setLogged] = useState();

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


    return (
        <div className='dashboard-card__container'>
            {Object.entries(sortedMeds).map(([time, meds]) => (
                <div key={time} className='dashboard-card__card'>
                    <h3 className='dashboard-card__time'>{time}</h3>
                    <div className='dashboard-card__medications'>
                        {meds.map((med, index) => (
                            <div key={index} className='dashboard-card__medication'>
                                <VerifiedIcon className='dashboard-card__medication-icon' sx={{ color: '#FFB0AF', fontSize: '2rem' }} />
                                <p className='dashboard-card__medication-name'>{med.name}</p>
                                <p className='dashboard-card__medication-dose'>{`${med.dose} mg`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
