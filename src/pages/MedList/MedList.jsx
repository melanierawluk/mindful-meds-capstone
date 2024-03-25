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

    const [medicationList, setMedicationList] = useState([]);

    useEffect(() => {
        const getMedicationList = async () => {
            try {
                const response = await axios.get(`${base_url}/meds/${userId}`)
                setMedicationList(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMedicationList();
    }, [])

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

    return (
        <>
            <Header title='Medications' />
            <section className='med-list'>
                <div className='med-list__block'>
                    <h2 className='med-list__heading'>Current</h2>

                    {activeMedArr.map((med) => {
                        return (
                            <Link className='med-list__link' to={`/${userId}/medications/${med.id}`} key={med.id}>
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
                    {filteredInactiveMedArr.map((med) => {
                        return (
                            <Link className='med-list__link' to={`/${userId}/medications/${med.id}`} key={med.id}>
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