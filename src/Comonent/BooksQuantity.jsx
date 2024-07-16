import React from 'react';
import { removeCartItem, modifyCartItem } from '../services/bookServices';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

function BookCartQuantity({ setAddToBagToggle, bookObj, getCartItemsAndUpdte }) {

    const calculateQuantity = async (action) => {
        let count;
        if (action === 'plus') {
            count = {
                quantityToBuy: bookObj.quantityToBuy + 1,
            };
        } else if (action === 'minus') {
            if (bookObj.quantityToBuy > 1) {
                count = {
                    quantityToBuy: bookObj.quantityToBuy - 1,
                };
            } else {
                
                return;
            }
        }

        let response = await modifyCartItem(bookObj._id, count);
        console.log(response);
        getCartItemsAndUpdte();
    };

    const removeItem = async () => {
        console.log(bookObj._id);
        let response = await removeCartItem(bookObj._id);
        setAddToBagToggle(true);
        console.log(response);
    };

    return (
        <div className='flex justify-around items-center w-[110px] h-[35px]'>
            <RemoveCircleIcon className={`text-slate-500 ${bookObj.quantityToBuy === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} onClick={() => { calculateQuantity("minus") }} />
            <div className='flex items-center justify-center w-[40%] h-[75%] text-sm bg-slate-100  border-2 border-slate-400' >
                {bookObj.quantityToBuy}
            </div>
            <AddCircleIcon className='text-slate-500 cursor-pointer' onClick={() => { calculateQuantity("plus") }} />
        </div>
    );
}

export default BookCartQuantity;
