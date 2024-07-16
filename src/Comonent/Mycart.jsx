import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orderItems, getCartItems } from '../services/bookServices';
import MyCartData from '../Comonent/MyCardData';
import AddressDetail from '../Comonent/AddressDetail';
import OrderSummary from '../Comonent/OrderSummary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

function MyCart() {
  const [cartData, setCartData] = useState([]);
  const [addressToggle, setAddressToggle] = useState(false);
  const [summaryToggle, setSummaryToggle] = useState(false);
  const [orderPlacedRouter, setorderPlacedRouter] = useState('');

  const getMyCartItem = async () => {
    let response = await getCartItems();
    let cartItem = response.data.result;
    setCartData(cartItem);
  };
  useEffect(() => {
    getMyCartItem();
  }, []);

  const OrderSendData = async () => {
    let arrayForHittingServer = cartData.map((cartObj) => ({
      product_id: cartObj.product_id._id,
      product_name: cartObj.product_id.bookName,
      product_quantity: cartObj.quantityToBuy,
      product_price: cartObj.product_id.discountPrice,
    }));
    let finalObj = { orders: arrayForHittingServer };
    let response = await orderItems(finalObj);
    console.log(response);
    setorderPlacedRouter('/OrderPlaced');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Grid className="w-[1345px] relative flex-grow ml-[100px]">
        <Grid className="w-[774px] ml-[177px] mr-[400px] pb-[114px] space-y-[10px]">
          <Item className="flex justify-start items-center w-full h-[40px] mt-4" xs={12} sm={6} md={4} lg={3}>
            <div>
              <Link to="/">
                <span className="cursor-pointer">Home/</span>
              </Link>
              <span className="text-slate-900">MyCart</span>
            </div>
          
          </Item>
          
          {/* Card information */}
          <Item className="w-full pl-[36px] pr-[27px] pt-[14px] shadow-sm shadow-slate-800" xs={12} sm={6} md={4} lg={3}>
            <div className="flex flex-col justify-center items-center">
              
              {cartData.map((cartInfo) => (
                <MyCartData getMyCartItem={getMyCartItem} cartItem={cartInfo} cartInfo={cartInfo.product_id} />
              ))}
              {!addressToggle && (
                <div className="w-full flex justify-end items-center">
                  <button
                    className="h-[35px] w-[150px] border-none bg-blue-600 text-white text-sm rounded-sm mb-[20px]"
                    onClick={() => setAddressToggle(true)}
                  >
                    PLACE ORDER
                  </button>
                </div>
              )}
            </div>
          </Item> 
          {/* Address details */}
          <Item className="w-full flex justify-center" xs={12} sm={6} md={4} lg={3}>
            {addressToggle ? (
              <AddressDetail setSummaryToggle={setSummaryToggle} summaryToggle={summaryToggle} />
            ) : (
              <div
                className="h-[60px] w-full pl-[36px] flex justify-start items-center text-sm  text-slate-700 shadow-sm shadow-slate-800"
                onClick={() => setAddressToggle(true)}
              >
                Address Details
              </div>
            )}
          </Item>
          {/* Order Summary */}
          <Item className="w-full flex justify-center" xs={12} sm={6} md={4} lg={3}>
            {summaryToggle ? (
              <div className="w-full  shadow-sm shadow-slate-800">
                <Typography sx={{ fontSize: '18px', fontWeight: '600', marginLeft: '36px', marginTop: '19px' }} className="w-full">
                  Order Summary
                </Typography>
                <div className="flex flex-col justify-center items-start">
                  {cartData.map((cartInfo) => (
                    <OrderSummary cartInfo={cartInfo.product_id} />
                  ))}
                </div>
                <Link to="/OrderPlaced">
                  <div className=" flex justify-end items-center">
                    <div>
                      <button
                        className="h-[35px] w-[160px] mr-[35px] mb-[23px] border-none bg-blue-600 text-white text-sm rounded-sm"
                        onClick={() => OrderSendData()}
                      >
                        CHECKOUT
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className="h-[60px] w-full pl-[36px] flex justify-start items-center text-sm  text-slate-700 shadow-sm shadow-slate-800"
                onClick={() => setSummaryToggle(true)}
              >
                Order summery
              </div>
            )}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyCart;