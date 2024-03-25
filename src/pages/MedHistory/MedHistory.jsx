import './MedHistory.scss'
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HistoryCard from '../../components/HistoryCard/HistoryCard';


export default function MedHistory() {

    // get meds with same name of the name param in url
    // map through each object and display date range, dose, and frequency

    const { userId, medName } = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const [medArr, setMedArr] = useState([])


    useEffect(() => {
        const getMedDetails = async () => {
            try {
                const response = await axios.get(`${base_url}/meds/${userId}`)
                setMedArr(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMedDetails();
    }, [])

    const matchedMeds = [];
    const unMatchedMeds = []

    medArr.map((med) => {
        med.name === medName ? matchedMeds.push(med) : unMatchedMeds.push(med);
    })

    if (!medArr) {
        return <div>loading...</div>
    }

    return (
        <>
            <Header title={`${medName} History`} />
            <section className='med-history'>
                {matchedMeds.map((med) => {
                    return (
                        <HistoryCard
                            med={med}
                            key={med.id} />
                    )
                })}

            </section>

        </>
    )
}