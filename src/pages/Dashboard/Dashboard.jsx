import './Dashboard.scss';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import currentDate from '../../utils/currentDate';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const { userId } = useParams();

    const [medicationSchedule, setMedicationSchedule] = useState([]);

    useEffect(() => {
        const getMedicationSchedule = async () => {
            try {
                const response = await axios.get(`${base_url}/user/${userId}/meds`)
                setMedicationSchedule(response.data)
                console.log(response.data)
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
        // Check if medicationSchedule is not empty
        if (medicationSchedule.length > 0) {
            medicationSchedule.forEach(element => {
                element.active === 1 ? activeMedArr.push(element) : inactiveMedArr.push(element)
            });
        }
    }
    isActiveMed();

    return (
        <>
            <Header />
            <section className='dashboard'>
                <h1 className='dashboard__title'>{`Today, ${currentDate}`}</h1>
                <div className='dashboard__content'>

                    {medicationSchedule.map((med, index) => {
                        return (
                            <DashboardCard
                                medicationSchedule={medicationSchedule}
                                setMedicationSchedule={setMedicationSchedule}
                                key={med.id}
                                med={med}
                                index={index}
                            />
                        )
                    })}
                    <p className='dashboard__card'>Add Note</p>
                </div>
            </section>
            <BottomNav />
        </>
    )
}