import React from "react";
import Home from './home'
import Patients from "./user/js/patients";
import Medications from "./medications/js/medications";
import AddMedication from "./medications/js/add_medication";
import Login from "./user/js/login";
import Registration from "./user/js/registration"
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/patients' element={<Patients/>}/>
          <Route path='/medications/:patientId' element={<Medications/>}/>
          <Route path="/add_medication/:patientId" element={<AddMedication/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registration/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;