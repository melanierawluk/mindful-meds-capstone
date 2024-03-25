import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';

export default function Profile() {
    const base_url = process.env.REACT_APP_BASE_URL;

    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState({});

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

    return (
        <>
            <Header title='Profile' />
            <section className='profile'>

                <div className='profile__container'>
                    <Input type="text" name="name" label="NAME" value={userProfile.name} />
                    <Input type="text" name="email" label="EMAIL" value={userProfile.email} />
                    <Link to="../login"><button className='profile__button'>Logout</button></Link>
                </div>
            </section>
            <BottomNav />

        </>
    )
}