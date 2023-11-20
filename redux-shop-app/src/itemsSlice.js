import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchItems = 
    createAsyncThunk("items/fetchItems", async () =>{
        const response = await axios.get("https://fakestoreapi.com/products")
        return response.data
    })

export const itemsSlice = createSlice({
    name: "items",
    initialState:{
        items: [],
        status: "idle",
        error: null,
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(fetchItems.pending, (state, action) =>{
            state.status = "loading";
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items.push(...action.payload);
        })
        .addCase(fetchItems.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    }
})
const {actions} = itemsSlice;
export const {addItem, removeItem} = actions;
export default itemsSlice.reducer;