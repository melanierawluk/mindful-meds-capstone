import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import Header from '../../components/Header/Header'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, ThemeProvider } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

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
    const navigate = useNavigate()

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
                // setFailedAuth(true);
            }
            // setIsLoading(false);
        };
        getUserProfile();

    }, [])

    const logout = () => {
        sessionStorage.removeItem("token");
        // setFailedAuth(true);
        setUserProfile(null);
        navigate('/login')
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let userName = '';
    let userEmail = '';
    if (userProfile) {
        userName = userProfile.name;
        userEmail = userProfile.email;
    }
    const firstName = userName.split(' ')

    // if (failedAuth) {
    //     return (
    //         <main className="dashboard">
    //             <h1 className="dashboard__title">Dashboard</h1>
    //             <p>You must be logged in to see this page.</p>
    //             <p><Link to="/login">Log in</Link></p>
    //         </main>
    //     )
    // }

    // if (isLoading) {
    //     return (
    //         <main className="dashboard">
    //             <h1 className="dashboard__title">Dashboard</h1>
    //             <p>Loading...</p>
    //         </main>
    //     )
    // }

    return (
        <>
            <Header />
            <ThemeProvider theme={customTheme}>
                <section className='profile'>
                    <div className='profile__container'>
                        <div className='profile__header'>
                            <h2 className='profile__welcome'>Hello, <br />  </h2>
                            <p className='profile__name'>{firstName[0]}</p>
                        </div>
                        <div className='profile__inputs'>
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="name"
                                label="Name"
                                value={userName}
                                onChange={handleInputChange}
                                disabled
                            />
                            <TextField
                                fullWidth
                                sx={{ my: 1 }}
                                type="text"
                                name="email"
                                label="Email"
                                value={userEmail}
                                onChange={handleInputChange}
                                disabled
                            />
                        </div>
                        <Button sx={buttonStyle} type="submit" variant='contained' onClick={logout}>Log out</Button>
                    </div>
                </section>
            </ThemeProvider>
            <BottomNav />

        </>
    )
}