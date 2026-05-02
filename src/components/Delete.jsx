import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../redux/slices/userSlice'

const Delete = ({id, remove, setRemove}) => {
  const dispatch = useDispatch()

  const deleteHandle = () => {
    dispatch(deleteUser(id))
    setRemove(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-8 min-w-[320px] shadow-2xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">Delete User</h1>
        <p className="font-mono text-sm text-zinc-400 mb-8">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={deleteHandle}
            className="flex-1 font-mono text-xs uppercase tracking-widest py-2.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-400 border border-red-900 transition-all"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setRemove(false)}
            className="flex-1 font-mono text-xs uppercase tracking-widest py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Delete