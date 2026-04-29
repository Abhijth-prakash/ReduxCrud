import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const EditUser = () => {
    const {id} = useParams()
    const {users,loading} = useSelector(state=>state.users)
    const user = users.find(items=>items.id == id)
    if(!user) return <p>user not found</p>
    const dispatch= useDispatch()
    const {register,handleSubmit,formState} = useForm({
        defaultValues:{
            name:user.name,
            email:user.email,
            age:user.age
        }
    })
    if(loading) return <p>loading...</p>
    

    const editFunction =(data)=>{
        dispatch(updateUser())
    }
  return (
    <div>
      <form onSubmit={()=>handleSubmit(editFunction)} >
        <input type="text" {...register("name")} />
        <input type="email" {...register("email")} />
        <input type="age" {...register("age")} />
        <button>submit</button>
      </form>
    </div>
  )
}

export default EditUser
