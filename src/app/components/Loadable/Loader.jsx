import React from 'react'
import './styles.css'

export default function Loader() {
  return (
    <>
    {/* <div style={{backgroundColor:'red'}}>HELLO</div> */}
    <div 
    style={{width:'15px', height:'15px'}} 
    className="lds-dual-ring"></div>
    {/* <div style={{backgroundColor:'green', zIndex:''}} className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
    </>
    
  )
  
}
