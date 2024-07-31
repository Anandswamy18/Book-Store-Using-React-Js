import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks, getCartItems, getWishlistItems } from '../services/bookServices';
import { getBookList } from '../store/bookSlice';
import { Badge, Button, Menu, TextField, InputAdornment } from "@mui/material";
import { FavoriteBorder, MarkunreadMailboxOutlined, PersonOutline, Search } from "@mui/icons-material";
import logo from '../assets/logo.svg';
import cart from '../assets/cart.svg';
import { Link, useNavigate } from "react-router-dom";
import { putCartList } from '../store/cartSlice';
import { setLoaded } from "../store/loadSlice";
import { putWishList } from '../store/wishSlice';

function Header() {
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [cartItemCount, setCartItemCount] = useState(0); 
    const openMenu = Boolean(menuAnchorEl);
    const books = useSelector((store)=> store.books.bookList)
    const cartItems = useSelector((store)=> store.cart.cartItems)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token =localStorage.getItem("tokens")
    const username =  localStorage.getItem('userName')
    useEffect(() => {
        const fetchBooks = async () => {
            let response = await getBooks();
            let arr = response.data.result;
            dispatch(getBookList(arr));
        };

        fetchBooks();
    }, [dispatch]);

    const getCartList = async()=>{
        if(books.length&&token){
        const res = await getCartItems()
        const cartList =res.data.result
        console.log(cartList,"cartlist");
        if(cartList.length){localStorage.setItem('userName',cartList[0].user_id.fullName)}
        const bookList = cartList.map((cartBook)=>{return{...books.filter((book)=>book._id===cartBook.product_id._id)[0],cartId:cartBook._id,quantityToBuy:cartBook.quantityToBuy,user_id:cartBook.user_id}})
        dispatch(putCartList(bookList))
        }
    }

    const getWishList =async () => {
        if(books.length&&token){
        const res = await getWishlistItems()
        const wishList =res.data.result
        const bookList = wishList.map((wishBook)=>{return books.filter((book)=>book._id===wishBook.product_id._id)[0]})
        dispatch(putWishList(bookList))
        if (bookList[0]!==undefined) {
            dispatch(setLoaded(true))
        }else if(!bookList.length){dispatch(setLoaded(true))}
        }
        if(!token){
            dispatch(setLoaded(true))
        }
    }

    useEffect(()=>{
        getCartList();
        getWishList()}
    
    ,[books])

    const handleClick = (event) => {    
        setMenuAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('tokens');
        localStorage.removeItem('userName');
        navigate('/'); 
    };

    const userName = localStorage.getItem('username');

    return (
        <div className='w-full h-[60px] mt-0 flex items-center bg-[#A03037] z-20 justify-around gap-20'>
            <div className="w-full md:w-[50%] flex flex-col md:flex-row items-center md:gap-[80px]">
                <div className='h-[48px] pr-[30px] md:pr-0 ml-[130px]'>
                    <Link to="/">
                        <div className='flex gap-[5px] items-center'>
                            <img src={logo} className='w-[40px] h-[40px]' alt='Head Logo'/>
                            <p className='text-white text-2xl font-sans'>Bookstore</p>
                        </div>
                    </Link>
                </div>
                <TextField 
                    className="w-full md:w-[95%] h-full bg-white rounded" 
                    id="search" 
                    placeholder="Search" 
                    size="small" 
                    type="search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div className='flex gap-10 items-center mr-[220px]'>
                <div onClick={handleClick} className="flex flex-col items-center text-white cursor-pointer">
                    <PersonOutline sx={{color:"white", fontSize:24}}/>
                    <p style={{ fontSize: 12, margin: 0 }}>{username || "Profile"}</p>
                </div>
                <Link to="/mycart">
                    <div className="flex flex-col items-center text-white mt-[4px]">
                        <Badge badgeContent={cartItemCount} color="primary"> 
                            <img src={cart} alt="cart" width="24px"/>
                        </Badge>
                        <p style={{ fontSize: 12, margin: 0 }}>Cart</p>
                    </div>
                </Link>
            </div>
            <Menu 
                id="simple-menu" 
                open={openMenu} 
                onClose={handleCloseMenu} 
                anchorEl={menuAnchorEl}
            >
                <div className='w-[240px] flex flex-col gap-[12px] pl-8'>
                    {token ? 
                        <span className="font-bold">Hello {username}</span> :
                        <span className="font-bold">Welcome</span>
                    }
                    {token ? (
                        <>
                            <Link to="/profile"><PersonOutline/>Profile</Link>
                            <Link to="/myoders"><MarkunreadMailboxOutlined/> My Orders</Link>
                            <Link to="/mywishlist"><FavoriteBorder/> My Wishlist</Link>
                            <Button 
                                variant="outlined" 
                                sx={{width:'150px',height:'40px',borderColor:"#A03037",color:"#A03037"}}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className="text-[11px] text-[#878787] mt-[-10px] mb-[10px]">
                                To access account and manage orders
                                <Link to="/signup">
                                    <Button 
                                        variant="outlined" 
                                        sx={{width:'150px',height:'40px',borderColor:"#A03037",color:"#A03037",marginTop:"10px"}}
                                    >
                                        LOGIN/SIGNUP
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                   
                </div>
            </Menu>
        </div>
    );
}

export default Header;