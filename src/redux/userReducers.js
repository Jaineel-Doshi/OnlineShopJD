import { createReducer } from '@reduxjs/toolkit'

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

} from '../constants/userConstants'

const initialState = {}

export const userLoginReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(USER_LOGIN_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(USER_LOGIN_SUCCESS, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
        .addCase(USER_LOGIN_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(USER_LOGOUT, (state, action) => {
            state = {}
        })
})

export const userRegisterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(USER_REGISTER_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(USER_REGISTER_SUCCESS, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        })
        .addCase(USER_REGISTER_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(USER_LOGOUT, (state, action) => {
            state = {}
        })
})

const initialStateUser = { user: {} }

export const userDetailsReducer = createReducer(initialStateUser, (builder) => {
    builder
        .addCase(USER_DETAILS_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(USER_DETAILS_SUCCESS, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.success2 = true;
        })
        .addCase(USER_DETAILS_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(USER_DETAILS_RESET, (state, action) => {
            state.user = {}
        })
})



export const userUpdateProfileReducer = createReducer({}, (builder) => {
    builder
        .addCase(USER_UPDATE_PROFILE_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(USER_UPDATE_PROFILE_SUCCESS, (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
            state.success = true;
        })
        .addCase(USER_UPDATE_PROFILE_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(USER_UPDATE_PROFILE_RESET, (state, action) => {
            state = {}
        })
})