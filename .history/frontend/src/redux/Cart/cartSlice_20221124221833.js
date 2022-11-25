import axios from "axios";
import { data } from "jquery";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


const initialState = {
  isFetching: false,
}

export const addCart = createAsyncThunk('cart/add',
            async(data,thunkAPI) =>{

                const { id , quantity } = data

                try{

                        const res = await axios.post(`http://localhost:4000/api/v1/cart/add/${id}`,{
                            quantity: quantity
                        })

                        

                }
                catch(e)
                {

                }
            })


const cartSlice = createSlice({
    name: "cart",
    initialState,
})