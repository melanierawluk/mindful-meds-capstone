import { useEffect, useState } from "react";
import axios from "axios";

const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState({});
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const getUserProfile = async () => {
            const token = sessionStorage.getItem("token");

            try {
                const response = await axios.get(`${base_url}/user/auth`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUserProfile();
    }, []);

    return userProfile;
};

export default useUserProfile;