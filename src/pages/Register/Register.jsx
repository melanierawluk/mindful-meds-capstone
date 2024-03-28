import './Register.scss';
import gradient from '../../assets/images/pastel-gradient.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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

export default function Register({ customTheme }) {

    return (

        <ThemeProvider theme={customTheme}>
            <section className='register'>
                <img src={gradient} className='register__gradient' alt="gradient" />
                <div className='register__container'>
                    <div className='register__form-container'>
                        <div className='register__head'>
                            <h1 className='register__title'><Link to='../login'><ArrowBackIcon style={{ color: '#7ECED8', fontSize: "2.1rem" }} /></Link> Create New <br /> Account</h1>
                        </div>
                        <form className='register__form' action="">
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="name"
                                id="name"
                                label="Name"
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="email"
                                name="email"
                                id="email"
                                label="Email"
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="password"
                                name="password"
                                id="password"
                                label="Password"
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="password"
                                name="confirm_password"
                                id="confirm_password"
                                label="Confirm Password"
                            />
                            <Button variant='contained' fullWidth sx={buttonStyle}>Sign up</Button>
                        </form>
                    </div>
                </div>
            </section>
        </ThemeProvider>
    )
}