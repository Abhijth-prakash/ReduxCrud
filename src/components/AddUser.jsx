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