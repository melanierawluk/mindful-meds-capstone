import './MedDetails.scss';

import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import MedForm from '../../components/MedForm/MedForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function MedDetails({ customTheme }) {
    const { userId, medId } = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const [error, setError] = useState({});
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
                const response = await axios.get(`${base_url}/meds/${userId}/${medId}`)
                setMedData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMedDetails();
    }, [])

    if (!medData) {
        return <div>loading...</div>
    }

    const isFormValid = () => {
        let isValid = true;
        const errors = {};

        if (!medData.name) {
            errors.name = "This field is required";
            isValid = false;
        }
        if (!medData.dose) {
            errors.dose = "This field is required";
            isValid = false;
        } if (!medData.frequency) {
            errors.frequency = "This field is required";
            isValid = false;
        } if (!medData.times) {
            errors.times = "This field is required";
            isValid = false;
        }
        // Update the error state
        setError(errors);

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        isFormValid();


        const updatedMedObj = {
            active: 1,
            name: medData.name,
            dose: medData.dose,
            frequency: medData.frequency,
            times: medData.times,
            user_id: userId
        };

        try {
            const response = await axios.post(`${base_url}/meds/${medId}/update`, updatedMedObj)
            const newMedResponse = await axios.get(`${base_url}/meds/${userId}/${response.data.id}`);
            console.log("reponse", response)
            console.log("newMedResponse", newMedResponse)
            // navigate(`/${userId}/meds/${response.data.id}`);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Header title={medData.name} />
            <section className='med-details'>
                <MedForm
                    handleSubmit={handleSubmit}
                    medData={medData}
                    setMedData={setMedData}
                    // handleDeleteMed={handleDeleteMed}
                    showDeleteButton={true}
                    showHistory={true}
                    userId={userId}
                    medId={medId}
                    customTheme={customTheme}
                    error={error}
                />
            </section>
            <BottomNav />
        </>
    )

}