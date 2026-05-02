import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, updateUser } from '../redux/slices/userSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("email is invalid"),
  age: z.coerce.number().min(1, "Age is required")
})

const EditUser = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { users, loading } = useSelector(state => state.users)
  const user = users.find(items => items.id == id)
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  useEffect(() => {
    if (user) reset({ name: user.name, email: user.email, age: user.age })
  }, [user])

  if (loading) return <p className="text-center text-zinc-400 mt-20">Loading...</p>
  if (!user) return <p className="text-center text-red-400 mt-20">User not found</p>

  const editFunction = (data) => {
    const duplicateName = users.find(items => items.name === data.name && items.id != id)
    const duplicateEmail = users.find(items => items.email === data.email && items.id != id)

    if (duplicateName) {
      setError("name", { message: "Name already exists" })
    } else if (duplicateEmail) {
      setError("email", { message: "Email already exists" })
    } else {
      dispatch(updateUser({ id, userData: data }))
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">Users</p>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">Edit User</h1>

        <form onSubmit={handleSubmit(editFunction)} className="flex flex-col gap-4">

          <div>
            <input
              type="text"
              {...register("name")}
              placeholder="Name"
              className="w-full font-mono text-sm bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-all"
            />
            <p className="font-mono text-xs text-red-400 mt-1.5 min-h-4">{errors.name?.message}</p>
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full font-mono text-sm bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-all"
            />
            <p className="font-mono text-xs text-red-400 mt-1.5 min-h-4">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="text"
              {...register("age")}
              placeholder="Age"
              className="w-full font-mono text-sm bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 transition-all"
            />
            <p className="font-mono text-xs text-red-400 mt-1.5 min-h-4">{errors.age?.message}</p>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 font-mono text-xs uppercase tracking-widest py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all"
            >
              Cancel
            </button>
            <button
              className="flex-1 font-mono text-xs uppercase tracking-widest py-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold transition-all"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditUser