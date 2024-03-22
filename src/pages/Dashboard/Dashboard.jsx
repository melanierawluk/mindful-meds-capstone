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

    const [medicationSchedule, setMedicationSchedule] = useState();

    useEffect(() => {
        const getMedicationSchedule = async () => {
            try {
                const response = await axios.get(`${base_url}dashboard/${userId}/meds`)
                // setMedicationSchedule(response)
                console.log(response)
            } catch (error) {

            }
        }
        getMedicationSchedule();
    }, [])

    return (
        <>
            <Header />
            <section className='dashboard'>
                <h1 className='dashboard__title'>{`Today, ${currentDate}`}</h1>
                <div className='dashboard__content'>
                    <DashboardCard />

                    <p className='dashboard__card'>Add Note</p>
                </div>
            </section>
            <BottomNav />
        </>
    )
}