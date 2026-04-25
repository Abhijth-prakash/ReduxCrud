import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 20px', backgroundColor:'#333' }}>
      <h2 style={{ color:'white', margin:0 }}>Logo</h2>
      <div style={{ display:'flex', gap:'20px' }}>
        <Link to="/" style={{ color:'white', textDecoration:'none' }}>Home</Link>
        <Link to="/add" style={{ color:'white', textDecoration:'none' }}>Add User</Link>
      </div>
    </div>
  )
}

export default Nav