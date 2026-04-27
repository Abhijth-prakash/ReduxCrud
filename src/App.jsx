import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddUser from './components/AddUser'
import Home from './components/Home'
import Nav from './components/Nav'
import User from './components/User'
import EditUser from './components/editUser'

function App() {

  return (
    <>
    <Nav></Nav>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/add' element={<AddUser></AddUser>}></Route>
      <Route path='/user/:id' element={<EditUser></EditUser>}></Route>
    </Routes>
  
    </>
  )
}

export default App
