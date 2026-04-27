import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import User from './User'

const Home = () => {
    const {users,loading,error} = useSelector(state=> state.users)
    const [id,setId] = useState()
    const [view,setView] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUsers())
    },[])
    
    if(loading) return <p>loading</p>
    if(error) return <p>something went wrong</p>


    const handle = (id)=>{
        setId(id)
        setView(true)
    }

    const deleteHandle =(id) =>{
        dispatch(deleteUser(id))
    }


    const listitems = users.map(items=> <li key={items.id}>
        <span>{items.name}</span>
        <span>{items.email}</span>
        <span>{items.age}</span>
        <Link to={`/user/${items.id}`}>edit</Link>
        <button onClick={()=>deleteHandle(items.id)}>delete</button>
       <button onClick={()=>handle(items.id)} >view</button>
    </li>)
    
  return (
    <div>
       {view && <User id={id} view={view} setView={setView} ></User> } 
        <h1>users:{users.length}</h1>
         <div>
        {error && <p>something went wrong</p>}  
        <ol>{listitems}</ol>
    </div>
      
    </div>
  )
}

export default Home
