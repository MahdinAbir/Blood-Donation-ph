
import { Outlet } from 'react-router'
import './App.css'
import GlassNavbar from './Components/GlassNavbar'
import Body from './Components/Home'
import Footer from './Components/Footer'

function App() {
  

  return (
    <>
    <div>
  
      <GlassNavbar></GlassNavbar>
      <Outlet></Outlet>
     
     <Footer></Footer>






    </div>





     
    </>
  )
}

export default App
