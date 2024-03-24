import './AddNewMed.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import MedForm from '../../components/MedForm/MedForm'

export default function AddNewMed() {

    return (
        <>
            <Header />
            <h1 className='new-med__title'>Add New Med</h1>
            <MedForm />
            <BottomNav />
        </>
    )
}
