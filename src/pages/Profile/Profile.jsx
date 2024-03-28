import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import just_breathe from '../../assets/images/just_breathe.png'
import { Button, TextField, ThemeProvider } from '@mui/material';

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

    return (
        <>
            <ThemeProvider theme={customTheme}>
                <section className='profile'>
                    <img src={just_breathe} className='profile__gradient' alt="gradient" />
                    <div className='profile__container'>
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
                            <Button sx={{ my: 3, p: 1, borderRadius: 2, color: 'white', fontSize: 15, width: '100%' }} type="submit" variant='contained'>Log out</Button>
                        </Link>
                    </div>
                </section>
            </ThemeProvider>
            <BottomNav />

        </>
    )
}