import React from 'react'
import { useSelector } from 'react-redux'

const User = ({id, view, setView}) => {
  const {users, loading, error} = useSelector(state => state.users)

  if(loading) return <p>loading....</p>
  if(error) return <p>something went wrong</p>

  const user = users.find(items => items.id == id)
  if(!user) return <p>loading....</p>

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 min-w-[320px] shadow-2xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-6">{user.name}</h1>
        <div className="flex flex-col gap-3 mb-8">
          <p className="font-mono text-sm text-zinc-400">📧 {user.email}</p>
          <p className="font-mono text-sm text-zinc-400">🎂 {user.age}</p>
        </div>
        <button
          onClick={() => setView(false)}
          className="w-full font-mono text-xs uppercase tracking-widest py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default User