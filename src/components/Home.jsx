import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/slices/userSlice'

const Home = () => {
    const {users,loading,error} = useSelector(state=> state.users)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUsers())
    },[])
    
    if(loading) return <p>loading</p>
    if(error) return <p>something went wrong</p>
    
  return (
    <div>
        <h1>hellowrold</h1>
      
    </div>
  )
}

export default Home
