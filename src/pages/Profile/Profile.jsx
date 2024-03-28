import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar, Button, TextField, ThemeProvider } from '@mui/material';

const buttonStyle = {
    mt: 2,
    borderRadius: 2,
    fontSize: 13,
    height: '2.5rem',
    width: '100%',
    fontWeight: 'regular'
}

export default function Profile({ customTheme }) {
    const base_url = process.env.REACT_APP_BASE_URL;

    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState({ name: '', email: '' });

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`${base_url}/user/${userId}`)
                setUserProfile(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserProfile();
    }, [])


    // Add function to update user profile name/email. Password?

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const firstName = userProfile.name.split(' ')

    return (
        <>
            <Header />
            <ThemeProvider theme={customTheme}>
                <section className='profile'>
                    {/* <img src={just_breathe} className='profile__gradient' alt="gradient" /> */}
                    <div className='profile__container'>
                        <div className='profile__header'>
                            <h2 className='profile__welcome'>Hello, <br /> {firstName[0]} </h2>
                            {/* <Avatar className='profile__avatar' sx={{ bgcolor: '#FFB0AF' }} >LE</Avatar> */}
                            {/* <p className='profile__name'>{firstName[0]}</p> */}
                        </div>
                        <div className='profile__inputs'>
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="name"
                                label="Name"
                                value={userProfile.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="email"
                                label="Email"
                                value={userProfile.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Link to="../login" className='profile__button-link'>
                            <Button sx={buttonStyle} type="submit" variant='contained'>Log out</Button>
                        </Link>
                    </div>
                </section>
            </ThemeProvider>
            <BottomNav />

        </>
    )
}