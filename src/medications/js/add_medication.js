import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../../api';
import '../css/add_medication.css';
import Navbar from '../../navbar';

const AddMedication = () => {
  const { patientId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    form: '',
    frequency: '',
    manufacturer: '',
    price: '',
    expirationDate: '',
    sideEffects: '',
    imagePath: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'expirationDate') {
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePath = `${file.name}`;
      setFormData({ ...formData, imagePath });
      setSelectedFile(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const formDataForImage = new FormData();
      formDataForImage.append('file', selectedFile);

      try {
        await fetchData(`/api/patients/${patientId}/medications/image`, 'POST', formDataForImage, null);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Image upload failed.');
        return;
      }
    }

    try {
      await fetchData(`/api/patients/${patientId}/medications`, 'POST', formData, 'application/json');
      window.location.href = `/medications/${patientId}`;
    } catch (error) {
      console.error('Error adding medication:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{paddingTop: '4rem'}}>
      <div className="medication-container">
        <h2>Add Medication</h2>
        <div style={{marginTop: '3rem'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Medication Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter medication name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dosage">Dosage</label>
            <input
              type="text"
              id="dosage"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="Enter dosage"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="form">Form</label>
            <input
              type="text"
              id="form"
              name="form"
              value={formData.form}
              onChange={handleChange}
              placeholder="e.g., Tablet"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              placeholder="e.g., Once a day"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Enter manufacturer"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sideEffects">Side Effects</label>
            <textarea
              id="sideEffects"
              name="sideEffects"
              value={formData.sideEffects}
              onChange={handleChange}
              placeholder="Describe side effects"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Add Medication</button>
        </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AddMedication;
