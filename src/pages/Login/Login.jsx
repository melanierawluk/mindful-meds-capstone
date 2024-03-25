import './Login.scss';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom';

export default function Login() {

    return (
        <section className='login'>
            <img src={logo} className='login__gradient' alt="gradient" />
            <div className='login__container'>
                <div className='login__form-container'>
                    <h1 className='login__title'>Login</h1>
                    <form className='login__form'>
                        <Input type="text" name="email" label="EMAIL" />
                        <Input type="password" name="password" label="PASSWORD" />
                        <Link to='../1/dashboard'><button className="login__form-button">Log in</button></Link>
                    </form>
                    <div className='login__text-container'>
                        <p className='login__text'>Forgot Password?</p>
                        <Link to='../register'><p className='login__text'>Sign up</p></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}