import './MedDetails.scss';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MedForm from '../../components/MedForm/MedForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useUserProfile from '../../utils/useUserProfile';
import axios from 'axios';
import dayjs from 'dayjs'


export default function MedDetails({ customTheme }) {
    const { medId } = useParams();
    const base_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const userProfile = useUserProfile();

    const [error, setError] = useState({});
    const [medData, setMedData] = useState(null);

    const [selectedTime1, setSelectedTime1] = useState(null);
    const [selectedTime2, setSelectedTime2] = useState(null);

    // Modal and Snackbar
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setTimeout(() => {
            setOpenSnackbar(false);
            navigate(`/medications`);
        }, 1500)
    }

    useEffect(() => {
        const getMedDetails = async () => {
            try {
                const token = sessionStorage.getItem("token");

                if (userProfile && userProfile.id) {
                    const response = await axios.get(`${base_url}/meds/${userProfile.id}/${medId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (response.data) {
                        setMedData(response.data)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        getMedDetails();
    }, [userProfile])


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Accounts for the frequency when meds are taken. Times are stored in the
        // selectedTime1 and selectedTime2 states & converted to readable dates,
        // then added to an array
        const selectedDates = [];

        if (selectedTime1) {
            const formattedTime1 = dayjs(selectedTime1).format('h:mm A');
            selectedDates.push(formattedTime1);
        }
        if (selectedTime2) {
            const formattedTime2 = dayjs(selectedTime2).format('h:mm A');
            selectedDates.push(formattedTime2);

        }

        const updatedMedObj = {
            active: 1,
            name: medData.name,
            dose: medData.dose,
            frequency: medData.frequency,
            times: selectedDates,
            user_id: userProfile.id
        };


        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${base_url}/meds/${medId}/update`, updatedMedObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.token) {
                sessionStorage.setItem("token", response.data.token);
            }

            setOpenUpdateSnackbar(true);
            setTimeout(() => {
                setOpenUpdateSnackbar(false);
                navigate(`/dashboard`, { updatedMedObj });
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    }

    const handleStopMed = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.patch(`${base_url}/meds/${userProfile.id}/${medId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.token) {
                sessionStorage.setItem("token", response.data.token);
            }
            handleClose();
            setOpenSnackbar(true);
        } catch (error) {
            console.log(error)
        }
    }

    if (!medData || medData === null) {
        return <></>
    }

    return (
        <>
            <Header title={medData.name} />
            <section className='med-details'>
                <div className='med-details__container'>
                    <div className='med-details__head'>

                        <Link className='med-details__link' to={`../medications`} >
                            <div className='med-details__heading'>
                                <ArrowBackIcon
                                    style={{ color: '#7ECED8', fontSize: "2.1rem" }}
                                    className='med-details__arrow' />
                                <p className='med-details__back'>Back</p>
                            </div>
                        </Link>
                    </div>
                    <MedForm
                        handleSubmit={handleSubmit}
                        medData={medData}
                        setMedData={setMedData}
                        handleStopMed={handleStopMed}
                        showHistory={true}
                        userId={userProfile.id}
                        customTheme={customTheme}
                        error={error}
                        setSelectedTime1={setSelectedTime1}
                        selectedTime1={selectedTime1}
                        setSelectedTime2={setSelectedTime2}
                        selectedTime2={selectedTime2}
                        openSnackbar={openSnackbar}
                        handleCloseSnackbar={handleCloseSnackbar}
                        open={open}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                        openUpdateSnackbar={openUpdateSnackbar}
                    />
                </div>
            </section >
        </>
    )

}
