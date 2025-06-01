/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import '../css/styles.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './header'
import SideBar from './NavBar'
import MonitorView from './MonitorView'
import GPSView from './GPSView'

function App() {
  
  const [width, setWidth] = useState(window.innerWidth);

    const [close, toggleSideBar] =useState(false);
  
    const HandleToggle = () =>{
      toggleSideBar(!close)
    }
  
  useEffect(()=>{
      const handleResize=()=>{
          setWidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  },[])
  
    const mobile = width>600;

  return (
    <>
      <Router>
        <Header />
        <SideBar mobile={mobile} close={close} HandleToggle={HandleToggle}/>
        <div className={`main-content ${mobile ? '':'mobile'}`}>
          <div className={`container ${!close? 'regular':'toggled'}`}>
            <Routes>
              <Route path="/MonitorView" element={<MonitorView />}/>
              <Route path="/GPS" element={<GPSView />} />
            </Routes>
          </div>
        </div>
    </Router>
    </>
  )
}

export default App
