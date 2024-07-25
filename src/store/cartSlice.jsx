import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        putCartList: (state, action) => {
            state.cartItems = action.payload;
        },
        addItemsToCart: (state, action) => {
            
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantityToBuy += action.payload.quantityToBuy;
            } else {
                state.cartItems.push(action.payload);
            }
        },
        updateCartQuantity: (state, action) => {
            const { _id, quantityToBuy } = action.payload;
            state.cartItems = state.cartItems.map((cartBook) => {
                if (cartBook._id === _id) {
                    return { ...cartBook, quantityToBuy };
                }
                return cartBook;
            });
        },
        deleteCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((book) => book._id !== action.payload);
        }
    }
});

export const { putCartList, addItemsToCart, updateCartQuantity, deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;
