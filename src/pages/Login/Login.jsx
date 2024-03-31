import './Login.scss';
import logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const buttonStyle = {
    mt: 2,
    borderRadius: 2,
    fontSize: 13,
    height: '2.5rem',
    width: '100%',
    fontWeight: 'regular'
}

export default function Login({ customTheme }) {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${base_url}/auth/login`, {
                email: event.target.email.value,
                password: event.target.password.value
            });
            sessionStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setError(error.response.data);
        }
    };


    return (
        <ThemeProvider theme={customTheme}>
            <section className='login'>
                <img src={logo} className='login__gradient' alt="gradient" />
                <div className='login__container'>
                    <div className='login__form-container'>
                        <h1 className='login__title'>Login</h1>
                        <form className='login__form' onSubmit={handleSubmit}>
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
                            <Button type='submit' variant='contained' sx={buttonStyle} className="login__form-button"> Log in</Button>
                            {error && <div className="login__message">{error}</div>}
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