import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import just_breathe from '../../assets/images/just_breathe.png'

export default function Profile() {
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

            <section className='profile'>
                <img src={just_breathe} className='profile__gradient' alt="gradient" />
                <div className='profile__container'>
                    <div className='profile__inputs'>
                        <Input type="text" name="name" label="NAME" value={userProfile.name} onChange={handleInputChange} />
                        <Input type="text" name="email" label="EMAIL" value={userProfile.email} onChange={handleInputChange} />
                    </div>
                    <Link to="../login"><button className='profile__button'>Logout</button></Link>
                </div>
            </section>
            <BottomNav />

        </>
    )
}