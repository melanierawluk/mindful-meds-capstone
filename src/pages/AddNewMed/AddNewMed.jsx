import './AddNewMed.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import MedForm from '../../components/MedForm/MedForm'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddNewMed({ customTheme }) {

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

    const [error, setError] = useState({});

    if (!medData) {
        return <div>loading...</div>;
    }
    const isFormValid = () => {
        let isValid = true;
        const newError = {};

        if (!medData.name) {
            newError.name = "This field is required";
            isValid = false;
        }
        if (!medData.dose) {
            newError.dose = "This field is required";
            isValid = false;
        }
        if (!medData.frequency) {
            newError.frequency = "This field is required";
            isValid = false;
        }
        if (!medData.times) {
            newError.times = "This field is required";
            isValid = false;
        }

        setError(newError)
        return isValid;
    };


    // Handle the form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        const isValidForm = isFormValid();

        if (isValidForm) {
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
    }

    return (
        <>
            <Header title="Add New Med" />
            <MedForm
                handleSubmit={handleSubmit}
                medData={medData}
                setMedData={setMedData}
                showPlaceHolder={true}
                error={error}
                customTheme={customTheme}
            />
            <BottomNav />
        </>
    )

}
