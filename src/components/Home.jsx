import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getUsers } from '../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import User from './User'
import Delete from './Delete'

const Home = () => {
    const {users,loading,error} = useSelector(state=> state.users)
    const [id,setId] = useState()
    const [input,setInput] = useState("")
    const [view,setView] = useState(false)
    const [radio,setRadio] = useState(false)
    const [remove,setRemove] = useState(false)
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

    const radioDatahandle =()=>{
        setRadio(prev=> !prev)
    }

    const removeHandle = (id)=>{
        setId(id)
        setRemove(true)
    }


    const listitems = users
        .filter(items => items.name.toLowerCase().includes(input.toLowerCase()) || items.email.toLowerCase().includes(input.toLowerCase()) )
        .filter(items => radio ? items.age >= 18 : items)
        .map(items=> <li key={items.id}>
        <span>{items.name}</span>
        <span>{items.email}</span>
        <span>{items.age}</span>
        <Link to={`/user/${items.id}`}>edit</Link>
       <button onClick={()=>handle(items.id)} >view</button>
       <button onClick={()=>removeHandle(items.id)}>Remove</button>
    </li>)
    
  return (
    <div>
        <input type="checkbox" name="filter" value="18+" checked={radio} onChange={radioDatahandle} /> 18+
        <input type="text" placeholder='search....' value={input} onChange={(e)=> setInput(e.target.value)}  />
        {remove && <Delete id={id} remove={remove}  setRemove={setRemove} ></Delete>}
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
