import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'

import { productReducer, productDetailsReducer, productReviewCreateReducer, productTopRatedReducer } from './productReducer'
import { cartReducer } from './cartReducer'
import {
    userLoginReducer, userRegisterReducer,
    userDetailsReducer, userUpdateProfileReducer
} from './userReducers'
import { orderCreateReducer } from './orderReducers'


const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}


export const store = configureStore({
    reducer: {
        productList: productReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        orderCreate: orderCreateReducer,
        productReviewCreate: productReviewCreateReducer,
        productTopRated: productTopRatedReducer,
    },
    preloadedState: initialState
})


