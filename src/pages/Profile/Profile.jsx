import './Profile.scss'
import BottomNav from '../../components/BottomNav/BottomNav'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {

    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userId}`)
                setUserProfile(response.data)
                console.log(userProfile)
            } catch (error) {
                console.log(error)
            }
        }
        getUserProfile();
    }, [])

    return (
        <BottomNav />
    )
}