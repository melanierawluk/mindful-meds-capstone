import './MedHistory.scss'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header/Header';


export default function MedHistory({ userProfile }) {

    const { medName } = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const [medArr, setMedArr] = useState([])
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1); // Navigating back one page
    };

    useEffect(() => {
        const getMedDetails = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.get(`${base_url}/meds/${userProfile.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
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
        med.name === medName ? matchedMeds.unshift(med) : unMatchedMeds.unshift(med);
        return matchedMeds;
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
                <div className='med-history__heading' onClick={handleGoBack}>
                    <ArrowBackIcon
                        style={{ color: '#7ECED8', fontSize: "2.1rem" }}
                        className='med-history__arrow' />
                    <p className='med-history__back'>Back</p>
                </div>
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