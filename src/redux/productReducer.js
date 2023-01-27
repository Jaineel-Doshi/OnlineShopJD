import { createReducer } from '@reduxjs/toolkit'
import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL,

} from '../constants/productConstants'


const initialState = { products: [] }

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PRODUCT_LIST_REQUEST, (state, action) => {
            state.loading = true;
            state.products = []
        })
        .addCase(PRODUCT_LIST_SUCCESS, (state, action) => {
            state.loading = false;
            // state.products = action.payload; -> adjusted below to work with paginator
            state.products = action.payload.products;
            state.page = action.payload.page;
            state.pages = action.payload.pages;

        })
        .addCase(PRODUCT_LIST_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        )
})


const initialStateI = { product: { reviews: [] } }

export const productDetailsReducer = createReducer(initialStateI, (builder) => {
    builder
        .addCase(PRODUCT_DETAILS_REQUEST, (state, action) => {
            state.loading = true;
            // state.products = []
        })
        .addCase(PRODUCT_DETAILS_SUCCESS, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        })
        .addCase(PRODUCT_DETAILS_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        )
})

export const productReviewCreateReducer = createReducer({}, (builder) => {
    builder
        .addCase(PRODUCT_CREATE_REVIEW_REQUEST, (state, action) => {
            state.loading = true;
            // state.products = []
        })
        .addCase(PRODUCT_CREATE_REVIEW_SUCCESS, (state, action) => {
            state.loading = false;
            // state.product = action.payload;
            state.success = true;
        })
        .addCase(PRODUCT_CREATE_REVIEW_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(PRODUCT_CREATE_REVIEW_RESET, (state, action) => {
            state = {}
        })
})


export const productTopRatedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PRODUCT_TOP_REQUEST, (state, action) => {
            state.loading = true;
            state.products = [];
        })
        .addCase(PRODUCT_TOP_SUCCESS, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(PRODUCT_TOP_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

})




// Action creators are generated for each case reducer function

// export const { productlist } = productSlice.actions

// export default productSlice.reducer

// export default productReducer


