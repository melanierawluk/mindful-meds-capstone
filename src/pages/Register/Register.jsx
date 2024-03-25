import './Register.scss';
import gradient from '../../assets/images/pastel-gradient.png';
import Input from '../../components/Input/Input';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function Register() {

    return (

        <section className='register'>
            <img src={gradient} className='register__gradient' alt="gradient" />
            <div className='register__container'>
                <div className='register__form-container'>
                    <div className='register__head'>
                        <h1 className='register__title'><Link to='../login'><ArrowBackIcon style={{ color: '#7ECED8', fontSize: "2.1rem" }} /></Link> Create New <br /> Account</h1>
                    </div>
                    <form className='register__form' action="">
                        <Input type="text" name="name" label="NAME" />
                        <Input type="email" name="email" label="EMAIL" />
                        <Input type="password" name="password" label="PASSWORD" />
                        <Input type="password" name="password" label="CONFIRM PASSWORD" />
                        <button className='register__button'>Sign up</button>
                    </form>
                </div>
            </div>
        </section>
    )
}