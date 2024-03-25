import './MedDetails.scss';

import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import MedForm from '../../components/MedForm/MedForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MedDetails() {
    const { userId, medId } = useParams();
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
                const response = await axios.get(`${base_url}/user/${userId}/meds/${medId}`)
                setMedData(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMedDetails();
    }, [])

    if (!medData) {
        return <div>loading...</div>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedMedObj = {
            active: 1,
            name: medData.name,
            dose: medData.dose,
            frequency: medData.frequency,
            times: medData.times,
            user_id: userId
        };

        try {
            const response = await axios.post(`${base_url}/user/${userId}/update`, updatedMedObj)
            const newMedResponse = await axios.get(`${base_url}/user/${userId}/meds/${response.data.id}`);
            navigate(`/user/${userId}/meds/${newMedResponse.data.id}`);
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
                    medId={medId} />
            </section>
            <BottomNav />
        </>
    )

}