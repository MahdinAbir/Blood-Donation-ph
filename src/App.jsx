
import { Outlet } from 'react-router'
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'

function App() {
  

  return (
    <>
    <div>
  
      <Navbar></Navbar>
      <Outlet></Outlet>
     
     <Footer></Footer>






    </div>





     
    </>
  )
}

export default App
