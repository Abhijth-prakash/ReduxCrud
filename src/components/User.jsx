import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = ({id,view,setView}) => {
    const {users,loading,error} = useSelector(state=> state.users)
    console.log(id)
    if(loading) return <p>loading....</p>
    if(error) return <p>something went wrong</p>

    const user = users.find(items=> items.id == id)
    if(!user) return <p>loading....</p>

    const handle = ()=>{
       setView(false)
    }
    
return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <div style={{ backgroundColor:'white', padding:'40px', borderRadius:'10px', minWidth:'300px', boxShadow:'0 5px 15px rgba(0,0,0,0.3)' }}>
            <h1 style={{ marginBottom:'10px' }}>{user.name}</h1>
            <p style={{ marginBottom:'8px' }}>📧 {user.email}</p>
            <p style={{ marginBottom:'8px' }}>🎂 {user.age}</p>
            <button onClick={()=>handle()} >close</button>
        </div>
    </div>
)
}

export default User
