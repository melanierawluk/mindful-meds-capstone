import './Login.scss';
import logo from '../../assets/images/logo.png';
import { Box, TextField, Button } from '@mui/material';



export default function Login() {


    return (
        <section className='login'>
            <img src={logo} className='login__gradient' alt="gradient" />
            <div className='login__form-container'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="EMAIL" variant="outlined" />
                    <TextField id="outlined-basic" label="PASSWORD" variant="outlined" />
                    <Button className="login__form-button" variant="contained">Log in</Button>
                </Box>
            </div>
        </section>
    )
}