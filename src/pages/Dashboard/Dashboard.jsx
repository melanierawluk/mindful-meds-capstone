import './Dashboard.scss';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import currentDate from '../../utils/currentDate';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const { userId } = useParams();

    const [activeMedArr, setActiveMedArr] = useState([]);
    const [inactiveMedArr, setInactiveMedArr] = useState([]);

    useEffect(() => {
        const getMedicationSchedule = async () => {
            try {
                // GET the medications
                const response = await axios.get(`${base_url}/meds/${userId}`)
                const meds = response.data;

                // Filter active and inactive medications
                const activeMeds = meds.filter(med => med.active === 1);
                const inactiveMeds = meds.filter(med => med.active === 0);

                setActiveMedArr(activeMeds);
                setInactiveMedArr(inactiveMeds);
            } catch (error) {
                console.log(error)
            }
        }
        getMedicationSchedule();
    }, [])

    return (
        <>
            <Header title={`Today, ${currentDate}`} />
            <section className='dashboard'>
                <div className='dashboard__content'>
                    {/* <Link to={`/${userId}/medications`}> */}
                    <DashboardCard
                        activeMedArr={activeMedArr}
                    />
                    {/* </Link> */}
                    <Link className='dashboard__card' to={`../${userId}/notes`}><p>Add Note</p></Link>
                </div>
            </section>
            <BottomNav />
        </>
    )
}
