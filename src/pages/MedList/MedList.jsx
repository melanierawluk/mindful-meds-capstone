import './MedList.scss';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ActiveMedCard from '../../components/ActiveMedCard/ActiveMedCard';
import InactiveMedCard from '../../components/InactiveMedCard/InactiveMedCard';
import { Link } from 'react-router-dom';

export default function MedList() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const { userId } = useParams();

    const [medicationSchedule, setMedicationSchedule] = useState([]);

    useEffect(() => {
        const getMedicationSchedule = async () => {
            try {
                const response = await axios.get(`${base_url}/meds/${userId}`)
                setMedicationSchedule(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMedicationSchedule();
    }, [])

    const activeMedArr = [];
    const inactiveMedArr = [];

    // Function to sort inactive/active medications
    const isActiveMed = () => {
        if (medicationSchedule.length > 0) {
            medicationSchedule.forEach(element => {
                element.active === 1 ? activeMedArr.push(element) : inactiveMedArr.push(element)
            });
        }
    }
    isActiveMed();

    return (
        <>
            <Header title='Medications' />
            <section className='med-list'>
                <div className='med-list__block'>
                    <h2 className='med-list__heading'>Current</h2>

                    {activeMedArr.map((med, index) => {
                        return (
                            <Link className='med-list__link' to={`/${userId}/medications/${med.id}`}>
                                <ActiveMedCard
                                    medicationSchedule={medicationSchedule}
                                    setMedicationSchedule={setMedicationSchedule}
                                    key={med.id}
                                    med={med}
                                    index={index}
                                    userId={userId}
                                />
                            </Link>
                        )
                    })}
                </div>
                <div className='med-list__block'>
                    <h2 className='med-list__heading'>Past</h2>
                    {inactiveMedArr.map((med, index) => {
                        return (
                            <Link className='med-list__link' to={`/${userId}/medications/${med.id}`}>
                                <InactiveMedCard
                                    medicationSchedule={medicationSchedule}
                                    setMedicationSchedule={setMedicationSchedule}
                                    key={med.id}
                                    med={med}
                                    index={index}
                                />
                            </Link>
                        )
                    })}
                </div>

            </section>
            <BottomNav />
        </>
    )
}