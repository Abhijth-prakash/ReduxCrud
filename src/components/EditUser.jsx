import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, updateUser } from '../redux/slices/userSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const EditUser = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {users, loading} = useSelector(state => state.users)
    const user = users.find(items => items.id == id)
    const navigate = useNavigate()
    const schema = z.object({
        name:z.string().min(1,"name is required"),
        email:z.string().email("email is invalid"),
        age: z.coerce.number().min(1, "Age is required") 
    })

    const {register, handleSubmit, reset,formState: { errors },setError} = useForm({
        resolver:zodResolver(schema)
    })

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        if(user) reset({ name: user.name, email: user.email, age: user.age })
    }, [user])

    if(loading) return <p>loading...</p>
    if(!user) return <p>user not found</p>
    

    const editFunction = (data) => {
        const duplicateName = users.find(items=> items.name === data.name && items.id != id)
        const duplicateEmail = users.find(items=> items.email === data.email && items.id != id)

    if (duplicateName) {
      setError("name", { message: "Name already exists" })  
    } else if (duplicateEmail) {
      setError("email", { message: "Email already exists" })
    } else {
        dispatch(updateUser({id, userData: data}))
        navigate('/')
    }
    }



    return (
        <div>
            <form onSubmit={handleSubmit(editFunction)}>
                <input type="text" {...register("name")} />
                <p style={{color:"black"}}>{errors.name?.message}</p>
                <input type="email" {...register("email")} />
                 <p style={{color:"black"}}>{errors.email?.message}</p>
                <input type="text" {...register("age")} />
                <p style={{color:"black"}}>{errors.age?.message}</p>
                <button>submit</button>
            </form>
        </div>
    )
}

export default EditUser