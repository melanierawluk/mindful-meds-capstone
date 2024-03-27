import './MedHistory.scss'
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import gradient from '../../assets/images/pastel-gradient.png'
import { Link } from 'react-router-dom';


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
    let medId = '';

    medArr.map((med) => {
        med.name === medName ? matchedMeds.unshift(med) : unMatchedMeds.unshift(med);
        medId = med.id;
    })

    if (!medArr) {
        return <div>loading...</div>
    }

    return (

        <section className='med-history'>
            <img src={gradient} className='med-history__gradient' alt="gradient" />
            <div className='med-history__container'>
                <div className='med-history__head'>

                    <Link to={`../${userId}/medications/`} ><ArrowBackIcon
                        style={{ color: '#7ECED8', fontSize: "2.1rem" }}
                        className='med-list__arrow' />
                    </Link>
                    <h1 className='med-history__title'>{medName}</h1>
                </div>

                {matchedMeds.map((med) => {
                    return (
                        <HistoryCard
                            med={med}
                            key={med.id} />
                    )
                })}
            </div>
        </section>


    )
}