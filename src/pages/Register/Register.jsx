import './Register.scss';
import gradient from '../../assets/images/pastel-gradient.png';
import Input from '../../components/Input/Input';

export default function Register() {

    return (

        <section className='register'>
            <img src={gradient} className='register__gradient' alt="gradient" />
            <div className='register__form-container'>
                <h1 className='register__title'>Create New <br />Account</h1>
                <form className='register__form' action="">
                    <Input type="text" name="name" label="NAME" />
                    <Input type="email" name="email" label="EMAIL" />
                    <Input type="password" name="password" label="PASSWORD" />
                    <Input type="password" name="password" label="CONFIRM PASSWORD" />
                    <button className='register__button'>Sign up</button>
                </form>
            </div>
        </section>
    )
}