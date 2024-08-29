import React, {useState, useEffect} from "react";
import '../css/medication.css';
import fetchData from "../../api";
import { useParams } from "react-router-dom";
import Navbar from "../../navbar";


const Medication = () => {
  const {patientId, id} = useParams();
  const [medication, setMedication] = useState({})

  fetchData(`/api/patients/${patientId}/medications/${id}`, 'GET', null, 'application/json')
  .then(data => setMedication(data))
  .catch(error => console.error("error fetching medication ", error));

  return (
    <>
      <Navbar/>
      {medication && <>
        <div className="medication-container">
          <div className="medication-wrapper">
            <div className="medication-img">
              <img src={`/uploads/${medication.imagePath}`}/>
            </div>
            <div className="medication-info">
              <div>
                <p className="info-name">name:</p>
                <p className="info-value">{medication.name}</p>
              </div>

              <div>
                <p className="info-name">name:</p>
                <p className="info-value">{medication.name}</p>
              </div>

              <div>
                <p className="info-name">dosage:</p>
                <p className="info-value">{medication.dosage}</p>
              </div>

              <div>
                <p className="info-name">form:</p>
                <p className="info-value">{medication.form}</p>
              </div>

              <div>
                <p className="info-name">frequency:</p>
                <p className="info-value">{medication.frequency}</p>
              </div>

              <div>
                <p className="info-name">manufacturer:</p>
                <p className="info-value">{medication.manufacturer}</p>
              </div>

              <div>
                <p className="info-name">price:</p>
                <p className="info-value">{medication.price}</p>
              </div>

              <div>
                <p className="info-name">expiration date:</p>
                <p className="info-value">{medication.expirationDate}</p>
              </div>

              <div>
                <p className="info-name">side effects:</p>
                <p className="info-value">{medication.sideEffects}</p>
              </div>
            </div>
        </div>
      </div>
      </>}
    </>
  );
};
export default Medication;