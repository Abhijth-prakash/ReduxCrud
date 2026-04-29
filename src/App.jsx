import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddUser from './components/AddUser'
import Home from './components/Home'
import Nav from './components/Nav'
import User from './components/User'
import EditUser from './components/editUser'
import ErrorBoundry from './Errorboundries/Errorboundry'

function App() {

  return (
    <>
    <Nav></Nav>
    <Routes>
      <Route path='/' element={<ErrorBoundry> <Home></Home> </ErrorBoundry>}></Route>
      <Route path='/add' element={<ErrorBoundry> <AddUser></AddUser> </ErrorBoundry>}></Route>
      <Route path='/user/:id' element={<ErrorBoundry> <EditUser></EditUser> </ErrorBoundry>}></Route>
    </Routes>
  
    </>
  )
}

export default App
