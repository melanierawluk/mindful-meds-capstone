import './Dashboard.scss';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import currentDate from '../../utils/currentDate';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard({ userProfile }) {
    const base_url = process.env.REACT_APP_BASE_URL;

    const [activeMedArr, setActiveMedArr] = useState([]);
    const [inactiveMedArr, setInactiveMedArr] = useState([]);


    // const [userProfile, setUserProfile] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [failedAuth, setFailedAuth] = useState(false);

    // const getUserProfile = async () => {
    //     const token = sessionStorage.getItem("token");

    //     try {
    //         const response = await axios.get(`${base_url}/user/auth`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         setUserProfile(response.data)
    //         console.log("userProfile", userProfile)
    //     } catch (error) {
    //         console.log(error);
    //         setFailedAuth(true);
    //     }
    //     setIsLoading(false);
    // };

    const getMedicationSchedule = async () => {
        try {
            // GET the medications
            const response = await axios.get(`${base_url}/meds/${userProfile.id}`)
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

    useEffect(() => {
        // getUserProfile();
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
                    <Link className='dashboard__card' to={`../notes`}><p>Add Note</p></Link>
                </div>
            </section>
            <BottomNav />
        </>
    )
}
