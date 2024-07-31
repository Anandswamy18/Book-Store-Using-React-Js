import React from 'react'
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Image from '../assets/books/Image 1.png'

const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function OrderSummary({ cartInfo }) {
    const bookdata = cartInfo;
    console.log(bookdata);
    
   
    return (
        <Grid className='w-[774px] h-[150px] p-4'>
            {/* book  */}
            <Grid sx={{ display: 'flex', }} className='ml-[36px] mt-[15px]'>
                <Item xs={12} sm={6} md={4} lg={3}>
                <img src={Image} width={100} height={50} className='w-[65px] h-[85px]' alt="" />
              
                </Item>
                <Item className='ml-[42px] w-[133px] h-[85px]' xs={12} sm={6} md={4} lg={3}>
                    <Typography>
                        <div className='h-[17px]  text-sm font-semibold'>
                            {bookdata?.bookName}
                            {/* Dont make me think */}
                        </div>
                    </Typography>
                    <Typography>
                        <div className='text-[10px] text-slate-500'>
                            {bookdata?.author}
                            {/* Steve Krug */}
                        </div>
                    </Typography>
                    <Typography className='w-1/2 flex justify-between items-center top-[10px]'>
                        <div className='text-[15px] text-bold text-slate-800' >Rs.
                            {bookdata?.discountPrice}
                            {/* 1200 */}
                        </div>
                        <div className='line-through left-[11px] text-[9px] text-slate-400'>Rs.
                            {bookdata?.price}
                            {/* 1700 */}
                        </div>
                    </Typography>
                </Item>
            </Grid>
        </Grid >
    )
}

export default OrderSummary