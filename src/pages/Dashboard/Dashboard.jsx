import './Dashboard.scss';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import * as currentDate from '../../utils/currentDate';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useUserProfile from '../../utils/useUserProfile';


export default function Dashboard({ customTheme }) {

    const base_url = process.env.REACT_APP_BASE_URL;
    const [activeMedArr, setActiveMedArr] = useState([]);
    const userProfile = useUserProfile

    useEffect(() => {
        const getMedicationSchedule = async () => {
            try {
                const token = sessionStorage.getItem("token");

                // GET the medications
                if (userProfile) {
                    const response = await axios.get(`${base_url}/meds/${userProfile.id}`
                        , {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                    const meds = response.data;
                    // console.log("response.data", response.data)

                    // Filter active and inactive medications
                    const activeMeds = meds.filter(med => med.active === 1);

                    setActiveMedArr(activeMeds);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getMedicationSchedule();
    }, [userProfile, base_url])

    function generateDay(dayOffset) {
        const currentDay = currentDate.day; // numbered day
        const currentDayIndex = currentDate.dayArr.indexOf(currentDate.currentDay);
        const dayIndex = (currentDayIndex + dayOffset + 7) % 7;
        return currentDate.dayArr[dayIndex];
    }

    const calendarDays = [-3, -2, -1, 0, 1, 2, 3].map(offset => (
        <div className='dashboard__calendar-date'>
            <p className='dashboard__calendar-day'>{generateDay(offset)}</p>
            <p className='dashboard__calendar-number'>{currentDate.day + offset}</p>
        </div>
    ))

    return (
        <>
            <Header title={`Today, ${currentDate.currentDate}`} />

            <section className='dashboard'>
                <div className='dashboard__calendar'>
                    {calendarDays}
                </div>
                <div className='dashboard__content'>
                    <DashboardCard
                        userProfile={userProfile}
                        customTheme={customTheme}
                        activeMedArr={activeMedArr}
                    />
                    <Link className='dashboard__card' to={`../notes`}><p>Add Note</p></Link>
                </div>
            </section>
            <BottomNav />
        </>
    )
}
