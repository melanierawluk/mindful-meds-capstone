import './AddNewMed.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import MedForm from '../../components/MedForm/MedForm'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddNewMed() {
    const base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const { userId } = useParams();


    const [medData, setMedData] = useState({});

    // handle updating data when save btn clicked
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        // validation?

        // create new obj to send data
        const newMedObj = {
            active: 1,
            name: medData.name,
            dose: medData.dose,
            frequency: medData.frequency,
            times: medData.times,
            user_id: userId
        };
        console.log(newMedObj)

        try {
            await axios.post(`${base_url}/meds/add/${userId}`, newMedObj);
            // navigate to medication list page
            navigate(`/medications`);
        } catch (error) {
            console.error("Error adding medication:", error);
        }
    };

    return (
        <>
            <Header />
            <h1 className='new-med__title'>Add New Med</h1>
            <MedForm
                handleOnSubmit={handleOnSubmit}
                setMedData={setMedData}
                medData={medData}
            />
            <BottomNav />
        </>
    )
}