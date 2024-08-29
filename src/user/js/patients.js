import React, {useState, useEffect} from "react";
import fetchData from "../../api";
import Navbar from "../../navbar";
import "../css/patients.css";


const Patients = () => {
    const [patients, setPatients] = useState([]);
    
    useEffect(() => {
        fetchData('/api/users/patients', 'GET', null, 'application/json')
        .then(data => {
            setPatients(data);
            
        })
        .catch(error => {
            console.error("error fetching users: ", error);
        })
    }, []);

    return (
        <>
        <Navbar/>

        <div className="patients_wrapper">
          <table>
            <thead>
              <tr>
                <th>first name</th>
                <th>last name</th>
                <th>username</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {patients && patients.map(patient=>(
              <tr>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.username}</td>
                <td><a href={`/medications/${patient.id}`}>Medications</a></td>
                <td><a href={`/add_medication/${patient.id}`}>Add medication</a></td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default Patients;