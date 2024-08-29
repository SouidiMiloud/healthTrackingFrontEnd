import React, { useState, useEffect } from 'react';
import fetchData from '../../api';
import '../css/medication.css';

const Medication = ({ patientId }) => {
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    form: '',
    frequency: '',
    manufacturer: '',
    price: '',
    expirationDate: '',
    sideEffects: ''
  });

  useEffect(() => {
    fetchData(`/api/patients/${patientId}/medications`, 'GET', null, 'application/json')
      .then(data => setMedications(data))
      .catch(error => console.error('Error fetching medications:', error));
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(`/api/patients/${patientId}/medications`, 'POST', formData, 'application/json')
      .then(newMedication => {
        setMedications([...medications, newMedication]);
        setFormData({
          name: '',
          dosage: '',
          form: '',
          frequency: '',
          manufacturer: '',
          price: '',
          expirationDate: '',
          sideEffects: ''
        });
      })
      .catch(error => console.error('Error adding medication:', error));
  };

  const handleUpdate = (id) => {
    fetchData(`/api/patients/${patientId}/medications/${id}`, 'PUT', formData, 'application/json')
      .then(updatedMedication => {
        const updatedMedications = medications.map(med => 
          med.id === id ? updatedMedication : med
        );
        setMedications(updatedMedications);
      })
      .catch(error => console.error('Error updating medication:', error));
  };

  const handleDelete = (id) => {
    fetchData(`/api/patients/${patientId}/medications/${id}`, 'DELETE', null, 'application/json')
      .then(() => setMedications(medications.filter(med => med.id !== id)))
      .catch(error => console.error('Error deleting medication:', error));
  };

  return (
    <div className="medication-wrapper">
      <h2>Medications</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Medication Name" required />
        <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} placeholder="Dosage" required />
        <input type="text" name="form" value={formData.form} onChange={handleChange} placeholder="Form (e.g., Tablet)" required />
        <input type="text" name="frequency" value={formData.frequency} onChange={handleChange} placeholder="Frequency" required />
        <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="Manufacturer" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} placeholder="Expiration Date" required />
        <textarea name="sideEffects" value={formData.sideEffects} onChange={handleChange} placeholder="Side Effects" required />
        <button type="submit">Add Medication</button>
      </form>
      
      <ul>
        {medications.map((med) => (
          <li key={med.id}>
            <h3>{med.name}</h3>
            <p>Dosage: {med.dosage}</p>
            <p>Form: {med.form}</p>
            <p>Frequency: {med.frequency}</p>
            <p>Manufacturer: {med.manufacturer}</p>
            <p>Price: {med.price}</p>
            <p>Expiration Date: {new Date(med.expirationDate).toLocaleDateString()}</p>
            <p>Side Effects: {med.sideEffects}</p>
            <button onClick={() => handleUpdate(med.id)}>Update</button>
            <button onClick={() => handleDelete(med.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medication;
