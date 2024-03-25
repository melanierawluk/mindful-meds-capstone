import './MedForm.scss';
import Input from '../Input/Input';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function MedForm({ handleSubmit, medData, setMedData }) {


    // if statement for frequency > adds more inputs for schedule
    // make drop down for frequency


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
                        id="name"
                        placeholder="'Wellbutrin'"
                        htmlFor="medication_name"
                        name="name"
                        label="MEDICATION NAME"
                        value={medData.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        id="dose"
                        placeholder="'100 mg'"
                        htmlFor="dose"
                        name="dose"
                        label="STRENGTH"
                        value={medData.dose}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        id="frequency"
                        placeholder="'Once daily'"
                        htmlFor="frequency"
                        name="frequency"
                        label="FREQUENCY"
                        value={medData.frequency}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        id="times"
                        placeholder="'9:00 AM'"
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