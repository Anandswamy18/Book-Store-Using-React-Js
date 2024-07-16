import React, { useState } from 'react'
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { userAddress } from '../services/bookServices';
// import { Bungee_Shade } from 'next/font/google';

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
}));


const citystate_Regex = /(^[A-Za-z]{2,})/;

function AddressDetail({ setSummaryToggle, summaryToggle }) {

    const [AdrsInt, setAdrsObj] = useState({ addressType: "", fullAddress: "", city: "", state: "" });
    const [errObj, setErrObj] = useState({
        cityError: false,
        cityHelper: "",
        stateError: false,
        stateHelper: "",
    });


    const takeAddress = (event) => {
        setAdrsObj((prev) => ({ ...prev, fullAddress: event.target.value }));

    };
    const takeCity = (event) => {
        setAdrsObj((prev) => ({ ...prev, city: event.target.value }));

    };
    const takeState = (event) => {
        setAdrsObj((prev) => ({ ...prev, state: event.target.value }));

    };
    const takeAddressType = (event) => {
        setAdrsObj((prev) => ({ ...prev, addressType: event.target.value }));

    };


    const Submit = async () => {
        let cityTest = citystate_Regex.test(AdrsInt.city);
        let stateTest = citystate_Regex.test(AdrsInt.state);

        if (cityTest === false) {
            setErrObj((prevState) => ({
                ...prevState,
                cityError: true,
                cityHelper: "Enter correct City",
            }));
        } else {
            setErrObj((prevState) => ({
                ...prevState,
                cityError: false,
                cityHelper: "",
            }));
        }

        if (stateTest === false) {
            setErrObj((prevState) => ({
                ...prevState,
                stateError: true,
                stateHelper: "Enter correct state",
            }));
        } else {
            setErrObj((prevState) => ({
                ...prevState,
                stateError: false,
                stateHelper: "",
            }));
        }
        console.log(AdrsInt)
        if (cityTest === true && stateTest === true) {
            let response = await userAddress(AdrsInt);
            console.log(response);
            setSummaryToggle(true);

        }

    };


    return (
        <Grid className='w-[770px] h-[450px] pt-[20px] pl-[36px] pr-[34px] shadow-sm shadow-slate-800'>
            <Item className='flex justify-between items-start h-8 mb-8' xs={12} sm={6} md={4} lg={3}>
                <div className='text-slate-800 text-[18px] font-semibold'>Customer Details</div>
                {
                    summaryToggle?" ": <div className='h-[35px] w-[150px] flex justify-center items-center shadow-sm  shadow-red-400 text-red-400 text-xs rounded-sm '><button >Add New Address</button></div>
                } 
            </Item>
            <div className='w-[512px] flex flex-col ml-6 '>
                <Grid container className='flex w-full justify-between items-center text-slate-800 py-2 ' >
                    <Item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            sx={{ height: '45px', width: '251px' }}
                            type={'text'}
                            label="Full Name"
                            variant="outlined"
                            required
                            size='small'
                        />
                    </Item>
                    <Item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            sx={{ height: '45px', width: '251px' }}
                            type={'tel'}
                            label="Mobile Number"
                            variant="outlined"
                            required
                            size='small'
                        />
                    </Item>
                </Grid>
                <Item className='flex w-full justify-between items-center text-slate-800' xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        fullWidth
                        type={'text'}
                        label="Address"
                        variant="outlined"
                        required
                        size='large'
                        onChange={takeAddress}
                    />
                </Item>
                <Grid container className='flex w-full justify-between items-center text-slate-800 py-2 ' >
                    <Item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            sx={{ height: '45px', width: '251px' }}
                            type={'text'}
                            label="City/Town"
                            variant="outlined"
                            required
                            size='small'
                            onChange={takeCity}
                            error={errObj.cityError}
                            helperText={errObj.cityHelper}
                        />
                    </Item>
                    <Item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            sx={{ height: '45px', width: '251px' }}
                            type={'text'}
                            label="State"
                            variant="outlined"
                            required
                            size='small'
                            onChange={takeState}
                            error={errObj.stateError}
                            helperText={errObj.stateHelper}
                        />
                    </Item>
                </Grid>
                {/* type */}
                <Item className='flex w-[375px] justify-between items-center text-slate-800' xs={12} sm={6} md={4} lg={3}>
                    <FormControl className='flex flex-col w-full'>
                        <FormLabel className='text-slate-900'>Type</FormLabel>
                        <RadioGroup
                            row
                            className='flex justify-between w-full'
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={takeAddressType}
                        >
                            <FormControlLabel value="Home" control={<Radio />} label="Home" />
                            <FormControlLabel value="Office" control={<Radio />} label="Office" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </Item>
            </div>
            <Item className='w-full flex justify-end items-center h-8 mb-8' xs={12} sm={6} md={4} lg={3}>
                {
                    summaryToggle ? " " :
                        <div className='h-[35px] w-[150px] flex justify-center items-center bg-blue-500 border-none text-white text-sm rounded-sm '><button onClick={() => Submit()}>CONTINUE</button></div>
                }
            </Item>
        </Grid>

    )
}

export default AddressDetail