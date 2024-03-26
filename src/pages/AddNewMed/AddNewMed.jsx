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

    const [medData, setMedData] = useState({
        active: 1,
        name: '',
        dose: '',
        frequency: '',
        times: '',
        user_id: ''
    });

    if (!medData) {
        return <div>loading...</div>;
    }

    // Handle the form submit
    const handleSubmit = async (event) => {
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

        try {
            await axios.post(`${base_url}/meds/${userId}/add`, newMedObj);
            navigate(`/${userId}/medications`)
        } catch (error) {
            console.error("Error adding medication:", error);
        }
    }
    return (
        <>
            <Header title="Add New Med" />
            <MedForm
                handleSubmit={handleSubmit}
                medData={medData}
                setMedData={setMedData}
                showPlaceHolder={true}
            // disableNameInput={false}
            />
            <BottomNav />
        </>
    )
}
