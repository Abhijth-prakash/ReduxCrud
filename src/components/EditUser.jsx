import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, updateUser } from '../redux/slices/userSlice'
import { useNavigate, useParams } from 'react-router-dom'

const EditUser = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {users, loading} = useSelector(state => state.users)
    const user = users.find(items => items.id == id)
    const navigate = useNavigate()
    const {register, handleSubmit, reset} = useForm()

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    useEffect(() => {
        if(user) reset({ name: user.name, email: user.email, age: user.age })
    }, [user])

    if(!user) return <p>user not found</p>
    if(loading) return <p>loading...</p>

    const editFunction = (data) => {
        dispatch(updateUser({id, userData: data}))
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(editFunction)}>
                <input type="text" {...register("name")} />
                <input type="email" {...register("email")} />
                <input type="text" {...register("age")} />
                <button>submit</button>
            </form>
        </div>
    )
}

export default EditUser