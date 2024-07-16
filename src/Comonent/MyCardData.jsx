import React from 'react'
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import BookCartQuantity from './BooksQuantity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from '../assets/books/Image 1.png'
import { removeCartItem } from '../services/bookServices';


const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function MyCartData({ getMyCartItem, cartInfo, cartItem }) {
    const bookdata = cartInfo
    const RemoveCart = async (Objid) => {
        console.log("cart id "+cartItem._id)
        let response = await removeCartItem(Objid)
        console.log(response);
        getMyCartItem();
    }

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column' }} className='w-[774px] h-[220px]
          flex flex-col pl-[36px] pr-[27px] pt-[14px]'>
            {/* myCard  */}
            <Item className='w-[100%] h-[40px] flex justify-between items-center'>
                <Typography className='text-[18px] text-slate-800'>
                    My cart 
                </Typography>
                <button className='h-[40px] w-[275px] text-sm  flex justify-between items-center shadow-sm shadow-slate-700'>
                    <LocationOnIcon className='text-red-800' />
                    Use Current Location
                    <ArrowDropDownIcon className='text-slate-300' />
                </button>
            </Item>
            {/* book  */}
            <Grid sx={{display:'flex',}} className='mt-[23px]'>
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
            <div className="ml-[105px] top-4 flex justify-between items-center  w-[15vw] text-sm">
                <div><BookCartQuantity bookObj={cartItem} getCartItemsAndUpdte={getMyCartItem} /></div>
                <div onClick={()=>RemoveCart(cartItem._id)} className='cursor-pointer'>Remove</div>
            </div>
            
        </Grid >
    )
}

export default MyCartData