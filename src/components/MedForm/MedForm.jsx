import './MedForm.scss';
import Input from '../Input/Input';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function MedForm() {


    // if statement for frequency > adds more inputs for schedule
    // make drop down for frequency

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
            const response = await axios.post(`${base_url}/meds/add/${userId}`, newMedObj);
            console.log(response)
            console.log(medData)
            navigate(`/medications/${userId}`)
        } catch (error) {
            console.error("Error adding medication:", error);
        }
        console.log(newMedObj)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (

        <div className='med-form__container'>
            <form className='med-form' onSubmit={handleSubmit}>
                <div className='med-form__inputs'>
                    <Input
                        type="text"
                        htmlFor="medication_name"
                        name="name"
                        label="MEDICATION NAME"
                        value={medData.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        htmlFor="dose"
                        name="dose"
                        label="STRENGTH"
                        value={medData.dose}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        htmlFor="frequency"
                        name="frequency"
                        label="FREQUENCY"
                        value={medData.frequency}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        htmlFor="times"
                        name="times"
                        label="SCHEDULE"
                        value={medData.times}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="med-form__button" >Done</button>
            </form>
        </div>
    )
}