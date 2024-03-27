import './MedDetails.scss';

import BottomNav from '../../components/BottomNav/BottomNav';
import Header from '../../components/Header/Header';
import MedForm from '../../components/MedForm/MedForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'


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

    const [selectedTime1, setSelectedTime1] = useState();
    const [selectedTime2, setSelectedTime2] = useState();

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Accounts for the frequency when meds are taken. Times are stored in the
        // selectedTime1 and selectedTime2 states & converted to readable dates,
        // then added to an array
        const selectedDates = [];

        if (selectedTime1) {
            const formattedTime1 = dayjs(selectedTime1).format('h:mm A');
            selectedDates.push(formattedTime1);
        }
        if (selectedTime2) {
            const formattedTime2 = dayjs(selectedTime2).format('h:mm A');
            selectedDates.push(formattedTime2);
        }


        const updatedMedObj = {
            active: 1,
            name: medData.name,
            dose: medData.dose,
            frequency: medData.frequency,
            times: selectedDates,
            user_id: userId
        };

        try {
            const response = await axios.post(`${base_url}/meds/${medId}/update`, updatedMedObj)
            const newMedResponse = await axios.get(`${base_url}/meds/${userId}/${response.data.id}`);
            console.log("reponse", response)
            console.log("newMedResponse", newMedResponse.data)
            // navigate(`/${userId}/medications/${newMedResponse.data}`);
        } catch (error) {
            console.log(error)
        }
    }

    const handleStopMed = async () => {
        try {
            await axios.patch(`${base_url}/meds/${userId}/${medId}`)
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
                    handleStopMed={handleStopMed}
                    showDeleteButton={true}
                    showHistory={true}
                    userId={userId}
                    medId={medId}
                    customTheme={customTheme}
                    error={error}
                    setSelectedTime1={setSelectedTime1}
                    selectedTime1={selectedTime1}
                    setSelectedTime2={setSelectedTime2}
                    selectedTime2={selectedTime2}
                />
            </section>
            <BottomNav />
        </>
    )

}