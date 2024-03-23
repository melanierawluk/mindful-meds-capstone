import './MedForm.scss';
import Input from '../Input/Input';

export default function MedForm({ handleOnSubmit, newMedData }) {


    // if statement for frequency > adds more inputs for schedule




    return (
        <div className='med-form__container'>
            <form className='med-form' type="submit" onClick={handleOnSubmit}>
                <div className='med-form__inputs'>
                    <Input type="text" name="medication_name" label="MEDICATION NAME" />
                    <Input type="text" name="dose" label="STRENGTH" />
                    <Input type="text" name="frequency" label="FREQUENCY" />
                    <Input type="text" name="times" label="SCHEDULE" />
                </div>
                <button type="submit" className="med-form__button" >Done</button>
            </form>
        </div>
    )
}