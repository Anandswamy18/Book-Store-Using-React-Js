import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import Login from './login';
import SignUp from './signup';
import loginImg from '../assets/loginImg.png';

function AuthPage() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="h-[100vh] flex items-center justify-center" style={value ? { backgroundColor: "#3c3c3c" } : { backgroundColor: "#bdbdbd" }}>
            <div className='w-[44%] h-[400px]'>
                <div className="absolute w-[26%] h-[425px] left-[50%] z-10 rounded-md bg-white">
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label={<span style={{ color: 'dark', fontSize: '1.1rem', fontWeight: 700 }}>Login</span>} />
                        <Tab label={<span style={{ color: 'dark', fontSize: '1.1rem', fontWeight: 700 }}>Signup</span>} />
        

                    </Tabs>
                    <div className='p-[50px] pt-6'>
                        {value ? <SignUp /> : <Login />}
                    </div>
                </div>
                <div className="w-[44%] h-[390px] mt-[18px] absolute z-0 rounded-3xl bg-[#F5F5F5]">
                    <img src={loginImg} alt="LoginImg" width={245} height={245} className='rounded-full mt-[52px] ml-[50px] mb-[30px]' />
                    <label className="font-[Roboto] text-lg uppercase font-semibold p-[70px]">Online Book Shopping</label>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
