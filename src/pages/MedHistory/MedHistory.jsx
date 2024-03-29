import './MedHistory.scss'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';


export default function MedHistory({ userProfile }) {

    const { medName } = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const [medArr, setMedArr] = useState([])

    useEffect(() => {
        const getMedDetails = async () => {
            try {
                const response = await axios.get(`${base_url}/meds/${userProfile.id}`)
                setMedArr(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMedDetails();
    }, [])

    const matchedMeds = [];
    const unMatchedMeds = []
    let medId = '';

    medArr.map((med) => {
        med.name === medName ? matchedMeds.unshift(med) : unMatchedMeds.unshift(med);
        medId = med.id;
    })

    if (medArr.length === 0) {
        return (
            <></>
        )
    }

    return (
        <>
            <Header title={medName} />
            <section className='med-history'>
                <Link className='med-history__link' to={`http://localhost:3000/medications/${medId}`} >
                    <div className='med-history__heading'>
                        <ArrowBackIcon
                            style={{ color: '#7ECED8', fontSize: "2.1rem" }}
                            className='med-history__arrow' />
                        <p className='med-history__back'>Back</p>
                    </div>
                </Link>
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