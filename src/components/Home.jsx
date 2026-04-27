import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/slices/userSlice'
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


    const listitems = users.map(items=> <li key={items.id}>
        <span>{items.name}</span>
        <span>{items.email}</span>
        <span>{items.age}</span>
        <button>edit</button>
        <button>delete</button>
       {/* <Link to={`/user/${items.id}`}>view</Link> */}
       <button onClick={()=>handle(items.id)} >view</button>
    </li>)
    
  return (
    <div>
       {view && <User id={id} view={view} setView={setView} ></User> } 
        <h1>users:{users.length}</h1>
        <ol>{listitems}</ol>
      
    </div>
  )
}

export default Home
