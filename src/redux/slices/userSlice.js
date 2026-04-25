import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data;
  }
);

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        users:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading = false
            state.users.push(action.payload) 
            state.error = null
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer