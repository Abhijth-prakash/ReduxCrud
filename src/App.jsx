import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddUser from './components/AddUser'
import Home from './components/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/add' element={<AddUser></AddUser>}></Route>
    </Routes>
  
    </>
  )
}

export default App
