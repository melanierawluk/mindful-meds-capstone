import './Login.scss';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Button, TextField, ThemeProvider } from '@mui/material';

const buttonStyle = {
    mt: 2,
    borderRadius: 2,
    fontSize: 13,
    height: '2.5rem',
    width: '100%',
    fontWeight: 'regular'
}

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
                            <Link to='../1/dashboard'><Button variant='contained' sx={buttonStyle} className="login__form-button"> Log in</Button></Link>
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