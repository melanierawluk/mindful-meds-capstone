import './MedList.scss';
import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ActiveMedCard from '../../components/ActiveMedCard/ActiveMedCard';
import InactiveMedCard from '../../components/InactiveMedCard/InactiveMedCard';
import { Link } from 'react-router-dom';

export default function MedList({ userProfile }) {
    const base_url = process.env.REACT_APP_BASE_URL;

    const [medicationList, setMedicationList] = useState([]);


    useEffect(() => {
        const getMedicationList = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (userProfile?.id) {
                    const response = await axios.get(`${base_url}/meds/${userProfile.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setMedicationList(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getMedicationList();
    }, [userProfile])

    const activeMedArr = [];
    const inactiveMedArr = [];

    // Function to sort inactive/active medications
    const isActiveMed = () => {
        if (medicationList.length > 0) {
            medicationList.forEach(element => {
                element.active === 1 ? activeMedArr.push(element) : inactiveMedArr.push(element)
            });
        }
    }
    isActiveMed();

    // Remove duplicate meds in inactive med array, if they are already in the active med array
    function removeDuplicateInactiveMeds(firstArr, secondArr) {
        const checkNameArr = firstArr.map(med => med.name);
        const filteredArr = secondArr.filter(med => !checkNameArr.includes(med.name));

        return filteredArr;
    }

    const filteredInactiveMedArr = removeDuplicateInactiveMeds(activeMedArr, inactiveMedArr)

    // Remove duplicated in inactive array
    const uniqueInactiveMeds = filteredInactiveMedArr.filter((obj, index) =>
        filteredInactiveMedArr.findIndex((item) => item.name === obj.name) === index);


    return (
        <>
            <Header title='Medications' />
            <section className='med-list'>
                <div className='med-list__block'>
                    <h2 className='med-list__heading'>Current</h2>

                    {activeMedArr.map((med) => {
                        return (
                            <Link className='med-list__link' to={`/medications/${med.id}`} key={med.id}>
                                <ActiveMedCard
                                    medicationList={medicationList}
                                    setMedicationList={setMedicationList}
                                    med={med}
                                />
                            </Link>
                        )
                    })}
                </div>
                <div className='med-list__block'>
                    <h2 className='med-list__heading'>Past</h2>
                    {uniqueInactiveMeds.map((med) => {
                        return (
                            <Link className='med-list__link' to={`/medications/${med.id}`} key={med.id}>
                                <InactiveMedCard
                                    medicationList={medicationList}
                                    setMedicationList={setMedicationList}
                                    med={med}
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