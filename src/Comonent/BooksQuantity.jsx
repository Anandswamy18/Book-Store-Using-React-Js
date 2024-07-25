import React from 'react';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { updateCartQuantity } from '../store/cartSlice'; 

function BookCartQuantity({ setAddToBagToggle, bookObj }) {
    console.log('Book Object:', bookObj);
    const dispatch = useDispatch();

    const calculateQuantity = (action) => {
        let newQuantity = bookObj.quantityToBuy;

        if (action === 'plus') {
            newQuantity += 1;
        } else if (action === 'minus') {
            if (newQuantity > 1) {
                newQuantity -= 1;
            } else {
                return;
            }
        }

        dispatch(updateCartQuantity({ _id: bookObj._id, quantityToBuy: newQuantity }));
    };

    const removeItem = () => {
        setAddToBagToggle(true);
    };

    return (
        <div className='flex justify-around items-center w-[110px] h-[35px]'>
            <RemoveCircleIcon
                className={`text-slate-500 ${bookObj.quantityToBuy === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                onClick={() => calculateQuantity('minus')}
            />
            <div className='flex items-center justify-center w-[40%] h-[75%] text-sm bg-slate-100 border-2 border-slate-400'>
                {bookObj.quantityToBuy}
            </div>
            <AddCircleIcon
                className='text-slate-500 cursor-pointer'
                onClick={() => calculateQuantity('plus')}
            />
        </div>
    );
}

export default BookCartQuantity;


