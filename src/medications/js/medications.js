import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../api";
import Navbar from "../../navbar";


const Medications = () => {
    const { patientId } = useParams();
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        fetchData(`/api/patients/${patientId}/medications`, 'GET', null, 'application/json')
        .then(data => {
            setMedications(data);
        })
        .catch(error => console.error("failed fetching medications" + error));
    }, []);

    return (
        <>
        <Navbar/>
        <div className="patients_wrapper">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>dosage</th>
                <th>form</th>
                <th>frequency</th>
                <th>manufacturer</th>
                <th>price</th>
                <th>expiration date</th>
                <th>side effects</th>
              </tr>
            </thead>
            <tbody>
              {medications.map(medication=>(
              <tr>
                <td>{medication.name}</td>
                <td>{medication.dosage}</td>
                <td>{medication.form}</td>
                <td>{medication.frequency}</td>
                <td>{medication.manufacturer}</td>
                <td>{medication.price}</td>
                <td>{medication.expirationDate}</td>
                <td>{medication.sideEffects}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </>
    );
};
export default Medications;