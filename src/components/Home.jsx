import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/slices/userSlice'
import { Link } from 'react-router-dom'
import User from './User'
import Delete from './Delete'

const Home = () => {
  const { users, loading, error } = useSelector(state => state.users)
  const [id, setId] = useState()
  const [input, setInput] = useState("")
  const [view, setView] = useState(false)
  const [radio, setRadio] = useState(false)
  const [remove, setRemove] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  if (loading) return <p className="text-center text-zinc-400 mt-20">Loading...</p>
  if (error) return <p className="text-center text-red-400 mt-20">Something went wrong</p>

  const handle = (id) => { setId(id); setView(true) }
  const radioDatahandle = () => { setRadio(prev => !prev) }
  const removeHandle = (id) => { setId(id); setRemove(true) }

  const listitems = users
    .filter(items => items.name.toLowerCase().includes(input.toLowerCase()) || items.email.toLowerCase().includes(input.toLowerCase()))
    .filter(items => radio ? items.age >= 18 : items)
    .map(items => (
      <li key={items.id} className="grid grid-cols-12 items-center bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl px-4 py-3.5 transition-all">
        <span className="col-span-3 font-semibold text-sm text-white">{items.name}</span>
        <span className="col-span-4 font-mono text-xs text-zinc-400">{items.email}</span>
        <span className="col-span-1 font-mono text-xs font-medium text-emerald-400">{items.age}</span>
        <div className="col-span-4 flex gap-2 justify-end">
          <button onClick={() => handle(items.id)} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all">View</button>
          <Link to={`/user/${items.id}`} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all">Edit</Link>
          <button onClick={() => removeHandle(items.id)} className="font-mono text-xs px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-400 border border-red-900 transition-all">Delete</button>
        </div>
      </li>
    ))

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase mb-1">Dashboard</p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Users <span className="text-zinc-600">/ {users.length}</span>
            </h1>
          </div>

          <div className="flex gap-4 items-center">
            {/* Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={radio} onChange={radioDatahandle} className="w-4 h-4 accent-emerald-400" />
              <span className="font-mono text-xs text-zinc-400">18+</span>
            </label>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="font-mono text-sm bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 pl-9 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-400 w-52"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest grid grid-cols-12 px-4 mb-2">
          <span className="col-span-3">Name</span>
          <span className="col-span-4">Email</span>
          <span className="col-span-1">Age</span>
          <span className="col-span-4 text-right">Actions</span>
        </div>

        {/* List */}
        <ol className="flex flex-col gap-2">{listitems}</ol>

      </div>

      {remove && <Delete id={id} remove={remove} setRemove={setRemove} />}
      {view && <User id={id} view={view} setView={setView} />}
    </div>
  )
}

export default Home