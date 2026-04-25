import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userData) => {
    const res = await fetch("https://69ecb239af4ff533142b4652.mockapi.io/users", {
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

export const getUsers = createAsyncThunk(
    "users/getusers",
    async ()=>{
        const res = await fetch("https://69ecb239af4ff533142b4652.mockapi.io/users")
        const data = await res.json();
        return data;
    }
)

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
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(getUsers.pending,(state)=>{
            state.loading = true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.users = action.payload 
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer