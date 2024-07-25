import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MyCartData from './MyCardData';
import AddressDetail from './AddressDetail';
import OrderSummary from './OrderSummary';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCartItem } from '../store/cartSlice'; 
import { Link, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { orderItems } from '../services/bookServices';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

function MyCart() {
  const cartData = useSelector((state) => state.cart.cartItems); 
  const token = localStorage.getItem("tokens");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [addressToggle, setAddressToggle] = useState(false);
  const [summaryToggle, setSummaryToggle] = useState(false);

  const handleDeleteItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  const handleAddressToggle = () => {
    if (token) {
      setAddressToggle(!addressToggle);
    } else {
      navigate("/signup");
    }
  };

  const handlePlaceOrder = () => {
    if (token) {
      setAddressToggle(true);
    } else {
      navigate("/signup");
    }
  };

  const OrderSendData = async () => {
    try {
      const arrayForHittingServer = cartData.map((cartObj) => ({
        product_id: cartObj.product_id?._id,  
        product_name: cartObj.product_id?.bookName,  
        product_quantity: cartObj.quantityToBuy,
        product_price: cartObj.product_id?.discountPrice, 
      }));
      const finalObj = { orders: arrayForHittingServer };
      let response = await orderItems(finalObj);
      console.log('Order Data:', finalObj);  
      navigate('/OrderPlaced');
    } catch (error) {
      console.error('Error placing order:', error);
      navigate('/signup');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid className="w-[1345px] relative flex-grow ml-[100px]">
        <Grid className="w-[774px] ml-[177px] mr-[400px] pb-[114px] space-y-[10px]">
          <Item className="flex justify-start items-center w-full h-[40px] mt-4">
            <div>
              <Link to="/">
                <span className="cursor-pointer">Home/</span>
              </Link>
              <span className="text-slate-900">MyCart</span>
            </div>
          </Item>

          {/* Card information */}
          <Item className="w-full pl-[36px] pr-[27px] pt-[14px] shadow-sm shadow-slate-800">
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
            <div className="flex flex-col justify-center items-center">
              {cartData.length > 0 ? (
                cartData.map((cartInfo) => (
                  <MyCartData
                    key={cartInfo._id}
                    getMyCartItem={() => {}}
                    cartItem={cartInfo}
                    onDelete={() => handleDeleteItem(cartInfo._id)}
                  />
                ))
              ) : (
                <Typography>No items in cart.</Typography>
              )}
              {!addressToggle && (
                <div className="w-full flex justify-end items-center">
                  <button
                    className="h-[35px] w-[150px] border-none bg-blue-600 text-white text-sm rounded-sm mb-[20px]"
                    onClick={handlePlaceOrder}
                  >
                    PLACE ORDER
                  </button>
                </div>
              )}
            </div>
          </Item>
          {/* Address details */}
          <Item className="w-full flex justify-center">
            {addressToggle ? (
              <AddressDetail setSummaryToggle={setSummaryToggle} summaryToggle={summaryToggle} />
            ) : (
              <div
                className="h-[60px] w-full pl-[36px] flex justify-start items-center text-sm text-slate-700 shadow-sm shadow-slate-800"
                onClick={handleAddressToggle}
              >
                Address Details
              </div>
            )}
          </Item>
          
          {/* Order Summary */}
          <Item className="w-full flex justify-center">
            {summaryToggle ? (
              <div className="w-full shadow-sm shadow-slate-800">
                <Typography sx={{ fontSize: '18px', fontWeight: '600', marginLeft: '36px', marginTop: '19px' }} className="w-full">
                  Order Summary
                </Typography>
                <div className="flex flex-col justify-center items-start">
                  {cartData.length > 0 ? (
                    cartData.map((cartInfo) => (
                      <OrderSummary key={cartInfo.product_id?._id} cartInfo={cartInfo.product_id} />
                    ))
                  ) : (
                    <Typography>No items in cart.</Typography>
                  )}
                </div>
                <div className="flex justify-end items-center">
                  <button
                    className="h-[35px] w-[160px] mr-[35px] mb-[23px] border-none bg-blue-600 text-white text-sm rounded-sm"
                    onClick={OrderSendData}
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="h-[60px] w-full pl-[36px] flex justify-start items-center text-sm text-slate-700 shadow-sm shadow-slate-800"
                onClick={() => setSummaryToggle(true)}
              >
                Order Summary
              </div>
            )}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyCart;
