import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/slices/userSlice'
const AddUser = () => {
    const {register,handleSubmit,formState} = useForm()
    const dispatch = useDispatch()

    const addingLogic = (data)=>{
            dispatch(addUser(data))
    }
  return (
    <div>
        <form onSubmit={handleSubmit(addingLogic)} >
            <input type="text" {...register("name",{required:true})} placeholder='name' />
            <input type="email" {...register("email",{required:true})} placeholder='email' />
            <input type="text" {...register("age",{required:true})}  placeholder='age' />
            <button>submit</button>
        </form>
      
    </div>
  )
}

export default AddUser
