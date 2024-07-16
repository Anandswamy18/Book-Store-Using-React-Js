import React, { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { getCartItems, addCartItem } from '../services/bookServices'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookCartQuantity from '../Comonent/BooksQuantity'
import { postWishList, getWishList } from '../services/bookServices';
import image1 from '../assets/books/Image 1.png'

const Item = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0),
}));


function BookDetails({ setToggle, bookInfo }) {
    const [addToBagToggle, setAddToBagToggle] = useState(true)
    const [bookObj, setBookObj] = useState({})
    const [isInWishlist, setIsInWishlist] = useState(false);

    const getCartItemsAndUpdte = async () => {

        let response = await getCartItems()
        console.log(bookInfo._id)

        for (let i = 0; i < response.data.result.length; i++) {
            if (response.data.result[i]?.product_id._id === bookInfo._id) {
                let itemNo = response.data.result[i].quantityToBuy
                console.log(itemNo)
                setBookObj(response.data.result[i])
                setAddToBagToggle(false)
            }
        }
    }
    const addToCart = async (bookId) => {
        let response = await addCartItem(bookId)
        console.log(response)
        await getCartItemsAndUpdte()
        return response
    }

    const addToWishlist = async (bookId) => {
          let respone=await postWishList(bookId);
          console.log(respone)
        setIsInWishlist(true);
    };

    
    useEffect(() => {
        getCartItemsAndUpdte()
    }, [])

    return (
        <Grid container className='relative w-full h-[700px] flex justify-center flex'   >
            <Grid container item className='h-[6vh] w-[72%] absolute flex justify-start items-center'  >
            <div onClick={() => setToggle(true)} className="cursor-pointer">Home/</div>

                <div className='text-sm font-bold'> Book</div>
            </Grid>
            <Grid item container className='flex justify-between absolute h-full top-[40px] pl-[40px]'>
                {/* book image   */}
                <Item className='w-[28%] h-auto'
                    xs={12} sm={6} md={4} lg={3}
                >
                    {/* image and button */}
                    <div className='w-full'>
                        {/* image  */}
                        <div className='w-full h-auto p-[20px] p-3 border-2 border-slate-600' >
                            <img  className='h-[280px] w-[220px]' src={image1} width={280} height={220}/>
                           
                        </div>
                        {/* buttons */}
                        <div className='w-full mt-3 h-8 flex justify-between items-center'>
                            {
                                addToBagToggle ? <button className='flex justify-around items-center h-[90%] w-[45%] bg-red-900 text-white text-xs' onClick={() => { addToCart(bookInfo._id); setAddToBagToggle(false) }}> ADD TO BAG</button> : <BookCartQuantity setAddToBagToggle={setAddToBagToggle} bookObj={bookObj} getCartItemsAndUpdte={getCartItemsAndUpdte} />
                            }
                           <button
                                className='flex justify-around items-center h-[90%] w-[45%] bg-slate-800 text-white text-xs'
                                onClick={() => addToWishlist(bookInfo._id)}
                                disabled={isInWishlist} 
                            >
                                <FavoriteBorderOutlinedIcon /> {isInWishlist ? 'IN WISHLIST' : 'WISHLIST'}
                            </button>
                        </div>
                    </div>            
                </Item>
                {/* book title  */}
                <Item className='flex items-end w-[557px] flex-col' xs={12} sm={6} md={4} lg={3} >
                    <div className='flex flex-col w-full space-y-0 border-b-2 border-slate-500'>
                        <Typography fontSize={20} fontWeight={600} color={'black'} className='text-2xl font-bold w-[100%]'>
                            {bookInfo?.bookName}
                            {/* <div className='text-2xl font-bold'>Dont make me think </div> */}
                        </Typography>
                        <Typography fontSize={14} fontWeight={500} className='flex justify-start items-start w-[60%] text-slate-600' >
                            {bookInfo?.author}
                            {/* <div className='text-sm text-slate-400'>By steve krug</div> */}
                        </Typography>
                        <Typography className='flex justify-start items-center w-[100%]'>
                            <div className='flex justify-center items-center w-[55px] text-sm bg-green-800 text-white'>3<StarOutlinedIcon fontSize='15px' /></div>
                            <div className='flex justify-center items-center text-sm ml-[10px]'></div>
                        </Typography>
                        <Typography className='flex  w-[100%]  items-center'>
                            <div className='text-xl my-[10px] font-bold text-slate-700'>Rs.
                                {bookInfo?.discountPrice}
                                {/* 1500 */}
                            </div>
                            <div className='ml-[10px] text-sm text-slate-600 line-through'>Rs.
                                {bookInfo?.price}
                                {/* 1700 */}
                            </div>
                        </Typography>
                    </div>
                    {/* Book Details  */}
                    <div className='flex flex-col items-start border-b-2 border-slate-500 py-[30px]'>
                        <li className='text-sm text-slate-400'>Book Details</li>
                        <p className='text-xs text-slate-800'>A book is a medium for recording information in the form of writing or images, typically composed of many pages (made of papyrus, parchment, vellum, or paper) bound together and protected by a cover. </p>
                    </div>
                    {/* Customer Feedback  */}
                    <div>
                        <div className='text-lg font-bold py-[10px]'>Customer Feedback</div>
                        <div className='p-1 h-[192px] w-[557px] bg-slate-200 rounded-sm flex flex-col space-y-[10px]'>
                            <p className='text-sm font-medium text-slate-900'>Overall rating</p>
                            <div ><StarBorderPurple500OutlinedIcon fontSize='small' /><StarBorderPurple500OutlinedIcon fontSize='small' /><StarBorderPurple500OutlinedIcon fontSize='small' /><StarBorderPurple500OutlinedIcon fontSize='small' /><StarBorderPurple500OutlinedIcon fontSize='small' />
                            </div>
                            <textarea type="text" placeholder='write your review' className='h-[60px] border-none p-1 row-2' spellcheck="false" autocomplete="off" />
                            <div className='w-full flex justify-end '>
                                <button className='bg-green-700 text-white text-sm p-1'>Submit</button>
                            </div>
                        </div>
                        {/* feedback 1 */}
                        <div className='mt-[10px] flex '>
                            <div className='mx-1'><AccountCircleIcon /></div>

                            <div className='flex flex-col'>
                                <div className='text-sm font-semibold text-slate-800'>Anand</div>
                                <div >
                                    <StarOutlinedIcon className='text-yellow-400' fontSize='small' /><StarOutlinedIcon className='text-yellow-400' fontSize='small' /><StarOutlinedIcon className='text-yellow-400' fontSize='small' /><StarBorderPurple500OutlinedIcon fontSize='small' /><StarBorderPurple500OutlinedIcon fontSize='small' />
                                </div>
                                <div className='text-xs text-slate-500'>Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.</div>
                            </div>
                        </div>
                        {/* feedback 2 */}

                        <div className='mt-[10px] flex '>
                            <div className='mx-1'><AccountCircleIcon /></div>

                            <div className='flex flex-col justify-center'>
                                <div className='text-sm font-semibold text-slate-800'>Swamy</div>
                                <div >
                                    <StarOutlinedIcon fontSize='small' className='text-yellow-400'/><StarOutlinedIcon fontSize='small' className='text-yellow-400' /><StarOutlinedIcon fontSize='small' className='text-yellow-400'/><StarBorderPurple500OutlinedIcon fontSize='small' className='text-yellow-400'/><StarBorderPurple500OutlinedIcon fontSize='small' />
                                </div>
                                <div className='text-[12px] text-slate-500'>Good product. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.</div>
                                </div>
                            </div>
                        </div>
                </Item>
            </Grid>
        </Grid >
    )
}

export default BookDetails