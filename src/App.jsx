import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from "react";

const AddUser = lazy(() => import("./components/AddUser"));
const Home = lazy(() => import("./components/Home"));
const Nav = lazy(() => import("./components/Nav"));
const User = lazy(() => import("./components/User"));
const EditUser = lazy(() => import("./components/editUser"));
const ErrorBoundry = lazy(() => import("./Errorboundries/Errorboundry"));

function App() {

  return (
    <>
<Suspense fallback={<p>Loading...</p>}>
  <ErrorBoundry>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddUser />} />
      <Route path='/user/:id' element={<EditUser />} />
    </Routes>
  </ErrorBoundry>
</Suspense>
    </>
  )
}

export default App
