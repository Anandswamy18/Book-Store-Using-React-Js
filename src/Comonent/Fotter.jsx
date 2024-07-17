import React from 'react'
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
}));
function Footer() {
    return (
        <Grid  className=' bg-slate-900 flex justify-center items-center h-12  ' >
            <Item className='flex justify-center items-center w-[72%] text-slate-100 text-xs' xs={12} sm={6} md={4} lg={3} >
                <span>Copyright © 2024, Bookstore Private Limited. All Rights Reserved</span>
            </Item>
        </Grid>
    )
}

export default Footer