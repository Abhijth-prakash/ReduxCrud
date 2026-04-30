import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/slices/userSlice'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is invalid"),
  age: z.coerce.number().min(1, "Age is required"), 
});

const AddUser = () => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema), 
  });

  const dispatch = useDispatch();

  const addingLogic = (data) => {
    dispatch(addUser(data));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(addingLogic)}>
        <input type="text" {...register("name")} placeholder="name" />
        <p style={{color:"black"}}>{errors.name?.message}</p>

        <input type="email" {...register("email")} placeholder="email" />
        <p style={{color:"black"}}>{errors.email?.message}</p>

        <input type="text" {...register("age")} placeholder="age" />
       <p style={{color:"black"}}>{errors.age?.message}</p>

        <button>submit</button>
      </form>
    </div>
  );
};

export default AddUser;