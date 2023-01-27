
import { createReducer } from '@reduxjs/toolkit'

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    // CART_CLEAR_ITEMS,
} from '../constants/cartConstants'




const initialState = { cartItems: [], shippingAddress: {} }

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(CART_ADD_ITEM, (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product == item.product)
            if (existItem) {
                state.cartItems = state.cartItems.map(x =>
                    x.product === existItem.product ? item : x)
            } else {
                state.cartItems.push(item)
            }
        })
        .addCase(CART_REMOVE_ITEM, (state, action) => {
            state.cartItems = state.cartItems.filter(x => x.product !== action.payload)
        })

        .addCase(CART_SAVE_SHIPPING_ADDRESS, (state, action) => {
            state.shippingAddress = action.payload
        })

        .addCase(CART_SAVE_PAYMENT_METHOD, (state, action) => {
            state.paymentMethod = action.payload
        })

    // .addCase(CART_CLEAR_ITEMS, (state, action) => {
    //     state.cartItems = {}
    // })
    // .addCase(PRODUCT_LIST_SUCCESS, (state, action) => {
    //     state.loading = false;
    //     state.products = action.payload;
    // })
    // .addCase(PRODUCT_LIST_FAIL, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    // }
    // )
})