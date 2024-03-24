import './DashboardCard.scss';

export default function DashboardCard({ activeMedArr }) {
    // Group medications based on their time

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

    const groupedMeds = groupMedicationsByTime(activeMedArr)

    return (
        <div className='dashboard-card__container'>
            {Object.entries(groupedMeds).map(([time, meds]) => (
                <div key={time} className='dashboard-card__card'>
                    <h3 className='dashboard-card__time'>{time}</h3>
                    <div className='dashboard-card__medications'>
                        {meds.map(med => (
                            <div key={med.id} className='dashboard-card__medication'>
                                <p className='dashboard-card__medication-name'>{med.name}</p>
                                <p className='dashboard-card__medication-dose'>{med.dose}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
