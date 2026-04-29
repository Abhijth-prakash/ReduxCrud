import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


//upadte user api
export const updateUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    const res = await fetch(`https://69ecb239af4ff533142b4652.mockapi.io/users/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;

  }
);


//delete user api
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    const res = await fetch(`https://69ecb239af4ff533142b4652.mockapi.io/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;

  }
);


//add user api
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


//get user api
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
        prevState: [],
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
        .addCase(deleteUser.pending,(state,action)=>{
            state.prevState = state.users
            const id = action.meta.arg
            state.users = state.users.filter(items=>items.id !==id)
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
            state.users = state.prevState
        })
    }
})

export default userSlice.reducer