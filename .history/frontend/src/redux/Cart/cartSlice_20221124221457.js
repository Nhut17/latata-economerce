const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
  isFetching: false,

const cartSlice = createSlice({
    name: "cart",
    initialState,
})