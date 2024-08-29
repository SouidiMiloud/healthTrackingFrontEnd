import React, {useState, useEffect} from "react";
import './navbar.css'


const Navbar = (props)=>{
    const active = {
      color: '#ddd',
      fontWeight: 'bold',
      borderBottom: 'solid 2px #fff',
      transition: '.4s'
    };
    const [activeButton, setActiveButton] = useState('home');
    
    const jwt = localStorage.getItem('jwt');
    const authenticatedUser = (jwt ? localStorage.getItem('name') : '');

    const clickButton = (path, e)=>{
      e.preventDefault();
      window.location.href = path;
    }

    const logout = ()=>{
      localStorage.removeItem('jwt');
      localStorage.removeItem('name');
      localStorage.removeItem('username');
      window.location.href='/';
    }

    useEffect(()=>{
      const path = window.location.pathname;
      const buttonMap = {
        '/': 'home'
      };
      setActiveButton(buttonMap[path]);
    });

    return (
      <>
        <div className="custom_nav">
          <button className="nav_btn" style={activeButton==='home'?active:{}} onClick={(e)=>clickButton('/', e)}>HOME</button>
          <button className="nav_btn" style={activeButton==='patients'?active:{}} onClick={(e)=>clickButton('/patients', e)}>PATIENTS</button>
        </div>
        <div className="drop_div">
            <button
            onClick={jwt ? logout : ()=>window.location.href = '/login'}>{jwt ? 'LOGOUT' : 'LOGIN'}
            </button> 
        </div>
        </>
    );
}
export default Navbar;