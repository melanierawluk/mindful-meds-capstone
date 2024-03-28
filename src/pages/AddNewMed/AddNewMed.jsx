import './AddNewMed.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import MedForm from '../../components/MedForm/MedForm'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

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

    const [selectedTime1, setSelectedTime1] = useState();
    const [selectedTime2, setSelectedTime2] = useState();
    const [error, setError] = useState({});

    if (!medData) {
        return <div>loading...</div>;
    }


    // Handle the form submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!medData.name || !medData.dose || !medData.frequency) {
            setError({
                name: !medData.name ? "This field is required" : null,
                dose: !medData.dose ? "This field is required" : null,
                frequency: !medData.frequency ? "This field is required" : null,
                // times: !medData.times ? "This field is required" : null
            });
            console.log(error)
            return;
        }

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

        // create new obj to send data
        const newMedObj = {
            active: 1,
            name: medData.name,
            dose: `${medData.dose}`,
            frequency: medData.frequency,
            times: selectedDates,
            user_id: userId
        };


        try {
            await axios.post(`${base_url}/meds/${userId}/add`, newMedObj);
            navigate(`/${userId}/medications`)
        } catch (error) {
            console.error("Error adding medication:", error);
        }
        // }
    }

    return (
        <>
            <Header title="Add New Med" />
            <section className='add-new-med'>
                <MedForm
                    handleSubmit={handleSubmit}
                    medData={medData}
                    setMedData={setMedData}
                    showPlaceHolder={true}
                    error={error}
                    customTheme={customTheme}
                    setSelectedTime1={setSelectedTime1}
                    selectedTime1={selectedTime1}
                    selectedTime2={selectedTime2}
                    setSelectedTime2={setSelectedTime2}
                />
            </section>
            <BottomNav />
        </>
    )

}
