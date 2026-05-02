import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, getUsers } from '../redux/slices/userSlice'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is invalid"),
  age: z.coerce.number().min(1, "Age is required"),
});

const AddUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users)

  const { register, reset, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const addingLogic = (data) => {
    const duplicateName = users.find(item => item.name === data.name)
    const duplicateEmail = users.find(item => item.email === data.email)

    if (duplicateName) {
      setError("name", { message: "Name already exists" })
    } else if (duplicateEmail) {
      setError("email", { message: "Email already exists" })
    } else {
      dispatch(addUser(data));
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">Users</p>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">Add User</h1>

        <form onSubmit={handleSubmit(addingLogic)} className="flex flex-col gap-4">

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

          <button className="w-full font-mono text-xs uppercase tracking-widest py-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold transition-all mt-2">
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddUser;