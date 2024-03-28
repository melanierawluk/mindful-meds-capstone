import './Login.scss';
import logo from '../../assets/images/logo.png';
import Input from '../../components/Input/Input'
import { Link } from 'react-router-dom';
import { Button, TextField, ThemeProvider } from '@mui/material';

export default function Login({ customTheme }) {

    return (
        <ThemeProvider theme={customTheme}>
            <section className='login'>
                <img src={logo} className='login__gradient' alt="gradient" />
                <div className='login__container'>
                    <div className='login__form-container'>
                        <h1 className='login__title'>Login</h1>
                        <form className='login__form'>
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="email"
                                label="Email"
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="password"
                                name="password"
                                label="Password"
                            />
                            <Link to='../1/dashboard'><Button variant='contained' sx={{ my: 1, color: 'white' }} className="login__form-button"> Log in</Button></Link>
                        </form>
                        <div className='login__text-container'>
                            <p className='login__text'>Forgot Password?</p>
                            <Link className='login__text' to='../register'><p >Sign up</p></Link>
                        </div>
                    </div>
                </div>
            </section>
        </ThemeProvider>
    )
}