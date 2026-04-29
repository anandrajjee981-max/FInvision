import React from 'react'
import Intro from './pages/Intro'
import Second from './pages/Second'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Addexpense from './pages/Addexpense'
import Navbar from './components/Navbar'

const App = () => {
  return (
  <main>
  <Navbar/>
<Routes>
<Route path='/' element = {<Intro/>}/>
<Route path= '/dashboard' element = {<Dashboard/>} />
<Route path= '/history' element = {<History/>} />
<Route path= '/addexpense' element = {<Addexpense/>} />

</Routes>


  </main>
  
 
  )
}  

export default App
