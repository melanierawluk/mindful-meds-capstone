import './MedHistory.scss'
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function MedHistory() {

    // get meds with same name of the name param in url
    // map through each object and display date range, dose, and frequency

    const { userId, medName } = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const [medData, setMedData] = useState({
        active: 1,
        name: '',
        dose: '',
        frequency: '',
        times: '',
        user_id: ''
    });



    useEffect(() => {
        const getMedDetails = async () => {
            try {

            } catch (error) {
                console.log(error)
            }
        }
        getMedDetails();
    }, [])

    if (!medData) {
        return <div>loading...</div>
    }

    return (
        <>
            <Header />
            <section className='med-history'>


            </section>

        </>
    )
}