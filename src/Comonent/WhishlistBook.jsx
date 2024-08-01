import { DeleteOutline } from "@mui/icons-material";
import {  deleteWishItem } from '../store/wishSlice';
import image from '../assets/books/Image 1.png'
import { useDispatch } from "react-redux";
import {deleteWishList} from '../services/bookServices'
function WishListBook({ cartInfo, cartItem }) {
    const bookdata = cartItem;
    const dispatch = useDispatch();
    

    const removeWishItem = async (id) => {
        try {

            
              dispatch(deleteWishItem(id))
            const res=  await deleteWishList(id)
            console.log(res);
             
            
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };
    return (
        <div className="flex gap-10 w-full h-[150px] rounded font-[Roboto] border-b-2 px-10 items-center">
           <img className="w-[80px] h-[100px]"  src={image} width={100} height={50}/>
                       <div className="flex flex-col gap-2">
                <h1 className="font-medium">{bookdata?.bookName}</h1>
                <p className="text-[#878787] text-sm">by {bookdata?.author}</p>
                <div className="flex items-center gap-1">
                    <h1 className="text-[18px] font-bold">Rs.{bookdata?.discountPrice}</h1>
                    <p className="line-through text-[12px] text-[#878787]">Rs.{bookdata?.price}</p>
                </div>
            </div>
            <button onClick={()=>removeWishItem(cartItem._id)}className="absolute right-[350px]">
                <DeleteOutline />
            </button>
        </div>
    );
}

export default WishListBook;
