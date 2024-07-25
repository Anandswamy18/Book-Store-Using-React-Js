import WishListBook from '../Comonent/WhishlistBook';
import { CircularProgress } from '@mui/material';
import { HeartBroken } from '@mui/icons-material';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  Typography } from '@mui/material';


function WishListContainer() {

    const wishListItems = useSelector((state) => state.wish.wishListItems);
    

    return (
        <>
            <div className="w-full h-full flex justify-center">
                {wishListItems.length>0 ? (
                    <div className="w-[62%] font-[Roboto] ml-[-40px]">
                        <div className="mt-[10px]">
                            <Link to="/">Home/</Link>
                            <span>My Wishlist</span>
                        </div>
                        <div className="w-full mt-1 min-h-[250px] border-[#707070] border">
                            <div className="text-lg font-semibold py-5 px-10 bg-[#F5F5F5]">
                                My Wishlist ({wishListItems.length})
                            </div>
                            <div className="flex flex-col gap-2">
                                {wishListItems.length ? (
                                    wishListItems.map((cartInfo) => (
                                        <WishListBook
                                            key={cartInfo._id}
                                            cartItem={cartInfo}
                                            cartInfo={cartInfo.product_id}
                                        />
                                    ))
                                ) : (
                                    <div className="flex h-[180px] justify-center items-center gap-2">
                                        <HeartBroken />
                                        <h1 className="text-xl">Your Wishlist is Empty!</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (<>
    
                <Typography>No items in wishlist.</Typography>
                </>
                    
                )}
            </div>
        </>
    );
}

export default WishListContainer;
