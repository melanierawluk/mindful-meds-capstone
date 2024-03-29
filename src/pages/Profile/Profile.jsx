import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Button, TextField, ThemeProvider } from '@mui/material';

const buttonStyle = {
    mt: 2,
    borderRadius: 2,
    fontSize: 13,
    height: '2.5rem',
    width: '75%',
    fontWeight: 'regular'
}

export default function Profile({ customTheme }) {
    const base_url = process.env.REACT_APP_BASE_URL;

    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [failedAuth, setFailedAuth] = useState(false);


    useEffect(() => {
        const getUserProfile = async () => {
            const token = sessionStorage.getItem("token");

            try {
                const response = await axios.get(`${base_url}/user/auth`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserProfile(response.data)
            } catch (error) {
                console.log(error);
                setFailedAuth(true);
            }
            setIsLoading(false);
        };
        getUserProfile();

    }, [])

    const logout = () => {
        sessionStorage.removeItem("token");
        setFailedAuth(true);
        setUserProfile(null)
    }

    // Add function to update user profile name/email. Password?

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const firstName = userProfile.name.split(' ')
    console.log(userProfile)

    return (
        <>
            <Header />
            <ThemeProvider theme={customTheme}>
                <section className='profile'>
                    {/* <img src={just_breathe} className='profile__gradient' alt="gradient" /> */}
                    <div className='profile__container'>
                        <div className='profile__header'>
                            <h2 className='profile__welcome'>Hello, <br />  </h2>
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
                                // value={userProfile.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="email"
                                label="Email"
                                // value={userProfile.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* <Link to="../login" className='profile__button-link'> */}
                        <Button sx={buttonStyle} type="submit" variant='contained' onClick={logout}>Log out</Button>
                        {/* </Link> */}
                    </div>
                </section>
            </ThemeProvider>
            <BottomNav />

        </>
    )
}