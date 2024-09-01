import React, {useState, useEffect} from "react";
import fetchData from "../../api";
import '../css/medications.css'
import { useParams } from "react-router-dom";
import Navbar from '../../navbar'


const Medications = () => {
  const {patientId} = useParams();
  const [medications, setMedications] = useState([]);

  const deleteMedication = (id) => {
    fetchData(`/api/patients/${patientId}/medications/${id}`, 'DELETE', null, null)
    .then(data => {
      displayMedications();
    })
  }

  const displayMedications = () => {
    fetchData(`/api/patients/${patientId}/medications`, 'GET', null, 'application/json')
    .then(data => setMedications(data))
    .catch(error => console.error("error fetching medications ", error));
  }

  useEffect(() => {
    displayMedications();
  }, []);
  return (
    <div>
      <Navbar/>
      <div className="medications_container">
        <div className="medications_wrapper">
          {medications && medications.map(med => (
            <a key={med.id} className="link" href={`medication/${patientId}/${med.id}`}>
              <div className="my-card">
                <img className="my-card-img" src={`/uploads/${med.imagePath}`}/>
                <div className="my-card-content">
                  <p className="my-card-title">{med.name}</p>
                  <p className="my-card-description">{med.form}</p>
                  <p className="my-card-description">{med.price} $</p>
                  {localStorage.getItem('role') == 'DOCTOR' &&
                    <button className="delete-btn" onClick={() => deleteMedication(med.id)}>DELETE</button>
                  }
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  ) ; 
};
export default Medications;