import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
      <h2 className="text-white font-extrabold text-xl tracking-tight">Logo</h2>
      <div className="flex gap-6">
        <Link to="/" className="font-mono text-xs text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Home</Link>
        <Link to="/add" className="font-mono text-xs text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">Add User</Link>
      </div>
    </nav>
  )
}

export default Nav