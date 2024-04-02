// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
    try {
        const getProduct = localStorage.getItem('cart');
        if (getProduct === null) {
            return undefined;
        }
        return JSON.parse(getProduct);
    } catch (err) {
        console.error('Error loading cart from local storage:', err);
        return undefined;
    }
};

// Function to save cart items to local storage
const saveCartToLocalStorage = (cartItems) => {
    try {
        const setProduct = JSON.stringify(cartItems);
        localStorage.setItem('cart', setProduct);
    } catch (err) {
        console.error('Error saving cart to local storage:', err);
    }
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: loadCartFromLocalStorage() || [] },
    reducers: {
        //addToCart functionality
        addToCart: (state, action) => {
            const itemId = action.payload;
            const isItemExit = state.items.find((item) => item.id === itemId)

            if (isItemExit) {
                isItemExit.quantity += 1

            } else {
                state.items.push({ ...itemId, quantity: 1 })
            }


            saveCartToLocalStorage(state.items);
        },
        //remove functionality
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item._id !== itemId)
            saveCartToLocalStorage(state.items);
        },
        // next 
    }

});

export const { addToCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
