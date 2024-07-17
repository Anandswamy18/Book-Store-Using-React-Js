import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


function ProfilePage() {
    const Item = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
    }));

    return (
        <div className="w-full h-full flex justify-center flex-col">
            <div className="w-[80%] font-[Roboto] relative left-[270px]">
                <div className="my-[20px]">
                    <Link to="/">
                        <Link to="/" className="text-[#9D9D9D]">Home /</Link>
                    </Link>
                    <span>Profile</span>
                </div>
                <div className="ml-[50px]">
                    <h1 className="text-[#0A0102] text-xl font-semibold">Personal Details</h1>
                    <div className="w-[44%] flex flex-col gap-2">
                        <div className="w-full flex flex-col">
                            <label>Full Name</label>
                            <span className="px-5 py-2 h-[45px] border-2 rounded">
                                {/* Full Name Value */}
                            </span>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Email Id</label>
                            <span className="px-5 py-2 h-[45px] border-2 rounded">
                                {/* Email Id Value */}
                            </span>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Password</label>
                            <span className="px-5 py-2 h-[45px] border-2 rounded">
                                {/* Password Value */}
                            </span>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Mobile Number</label>
                            <span className="px-5 py-2 h-[45px] border-2 rounded">
                                {/* Mobile Number Value */}
                            </span>
                        </div>
                    </div>
                </div>
                <Grid className='w-[770px] h-[450px] pt-[40px] pl-[36px] pr-[34px] shadow-sm '>
                    <Item className='flex justify-between items-start h-8 mb-8' xs={12} sm={6} md={4} lg={3}>
                        <div className='text-slate-800 text-[18px] font-semibold ml-[18px]'>Address Details</div>
                        <div className='h-[35px] w-[150px] relative right-[175px] flex justify-center items-center shadow-sm shadow-red-400 text-red-400 text-xs rounded-sm '>
                            <button>Add New Address</button>
                        </div>
                    </Item>
                    <div className='w-[512px] flex flex-col ml-4'>
                        <div className='flex flex-col '>
                            <label className='text-slate-800 mb-2'>Address</label>
                            <Item className='flex w-full justify-between items-center text-slate-800' xs={12} sm={6} md={4} lg={3}>
                                <TextField
                                    fullWidth
                                    type={'text'}
                                    variant="outlined"
                                    required
                                    size='large'
                                    disabled
                                />
                            </Item>
                        </div>
                        <Grid container className='flex w-full justify-between items-center text-slate-800 py-2'>
                            <div className='flex flex-col  w-[48%]'>
                                <label className='text-slate-800 mb-2'>City/Town</label>
                                <Item xs={12} sm={6} md={4} lg={3}>
                                    <TextField
                                        sx={{ height: '45px', width: '100%' }}
                                        type={'text'}
                                        variant="outlined"
                                        required
                                        size='small'
                                        disabled
                                    />
                                </Item>
                            </div>
                            <div className='flex flex-col  w-[48%]'>
                                <label className='text-slate-800 mb-2'>State</label>
                                <Item xs={12} sm={6} md={4} lg={3}>
                                    <TextField
                                        sx={{ height: '45px', width: '100%' }}
                                        type={'text'}
                                        variant="outlined"
                                        required
                                        size='small'
                                        disabled
                                    />
                                </Item>
                            </div>
                        </Grid>
                        <Item className='flex w-[375px] justify-between items-center text-slate-800' xs={12} sm={6} md={4} lg={3}>
                            <FormControl className='flex flex-col w-full'>
                                <label className='text-slate-900'>Type</label>
                                <RadioGroup
                                    row
                                    className='flex justify-between w-full'
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    
                                >
                                    <FormControlLabel  className='text-slate-800'value="Home" control={<Radio />} label="Home " disabled />
                                    <FormControlLabel value="Office" control={<Radio />} label="Office" disabled />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" disabled />
                                </RadioGroup>
                            </FormControl>
                        </Item>
                    </div>
                </Grid>
            </div>
        </div>
    );
}

export default ProfilePage;

