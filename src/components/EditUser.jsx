import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const EditUser = () => {
    const {id} = useParams
    const {users} = useSelector(state=>state.users)
  return (
    <div>
      <h1>edit</h1>
    </div>
  )
}

export default EditUser
