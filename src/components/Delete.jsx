import React from 'react'
import { useDispatch} from 'react-redux'
import { deleteUser } from '../redux/slices/userSlice'

const Delete = ({id,remove,setRemove}) => {
        const dispatch = useDispatch()

        const deleteHandle =() =>{
            dispatch(deleteUser(id))
            setRemove(false)
        }

    
return (
    <div style={{ position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center' }}>
        <div style={{ backgroundColor:'white', padding:'40px', borderRadius:'10px', minWidth:'300px', boxShadow:'0 5px 15px rgba(0,0,0,0.3)' }}>
            <h1 style={{ marginBottom:'10px' }}>Delete</h1>
            <p>Do you wanna delete this user</p>
            <div style={{display:"flex"}}>
                <button onClick={deleteHandle}  >yes</button>
                <button onClick={()=>setRemove(false)} >no</button>
            </div>
          
        </div>
    </div>
)
}

export default Delete
