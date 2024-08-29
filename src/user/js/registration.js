import React, { useState } from "react";
import Navbar from "../../navbar";
import '../css/registration.css'
import fetchData from "../../api";


const Registration = ()=>{
    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const updateInfo = (event)=>{
        const {name, value} = event.target;
        setInfo(prev=>({
            ...prev,
            [name]: value
        }));
    }

    const registerUser = (e)=>{
        e.preventDefault();

        fetchData('/api/auth/register', 'POST', info, 'application/json')
        .then(data => {
          window.location.href = '/login';
        })
    }

    return (
      <>
      <Navbar/>
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <form onSubmit={registerUser}>
          <div className="reg_wrapper">
          <h2>Create your account here</h2>
            <div style={{marginTop: '4rem'}}>
              <div className="reg_inputField">
                <label>first name</label>
                <input type="text" name="firstName" value={info.firstName} onChange={updateInfo} placeholder="enter your first name"/>
              </div>
              <div className="reg_inputField">
                <label>username</label>
                <input type="email" name="username" value={info.username} onChange={updateInfo} placeholder="enter your username"/>
            </div>
            <div className="reg_inputField">
              <label>password</label>
              <input type="password" name="password" value={info.password} onChange={updateInfo} placeholder="enter your password"/>
            </div>
          </div>

          <div style={{marginTop: '4rem'}}>
            <div className="reg_inputField">
              <label>last name</label>
              <input type="text" name="lastName" value={info.lastName} onChange={updateInfo} placeholder="enter your last name"/>
            </div>
            <div className="reg_inputField">
              <label>confirm</label>
              <input type="password" name="confirmPassword" value={info.confirmPassword} onChange={updateInfo} placeholder="confirm your password"/>
            </div>
          </div>

            <button className="reg_submit_btn">register</button>
            </div>
          </form>
      </div>
      </>
    );
}
export default Registration;