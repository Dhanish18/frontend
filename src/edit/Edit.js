import React, { useState } from "react";
import "./Edit.css";
import axios from "axios";

const Edit = ({ visible, setVisible, formData, setFormData }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  const handleClose = () => {
    setVisible(!visible);
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setLocalFormData({ ...localFormData, [name]: value });
  };

  const handleSubmitData = async (id) => {
    try {
      await axios.put(`http://localhost:3001/updateData/${id}`, localFormData);
      setFormData((prevData) =>
        prevData.map((data) => (data._id === id ? localFormData : data))
      );
      setVisible(!visible);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-container">
      <div className="edit">
        <label>Name:</label>
        <input
          type="text"
          value={localFormData.name}
          onChange={handleUpdateChange}
          name="name"
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          value={localFormData.email}
          onChange={handleUpdateChange}
          name="email"
        />
        <br />

        <label>DOB:</label>
        <input
          type="date"
          value={localFormData.dob}
          onChange={handleUpdateChange}
          name="dob"
        />
        <br />

        <label>Gender:</label>
        <select
          value={localFormData.gender}
          onChange={handleUpdateChange}
          name="gender"
        >
          <option>--select--</option>
          <option>male</option>
          <option>female</option>
          <option>others</option>
        </select>
        <br />

        <label>Phone:</label>
        <input
          type="number"
          value={localFormData.phone}
          onChange={handleUpdateChange}
          name="phone"
        />
        <br />

        <label>Country:</label>
        <select
          name="country"
          value={localFormData.country}
          onChange={handleUpdateChange}
        >
          <option>--select--</option>
          <option>usa</option>
          <option>india</option>
          <option>australia</option>
        </select>
        <br />
        <button type="submit" onClick={handleSubmitData}>
          submit
        </button>
        <div className="exit-btn">
          <button onClick={handleClose}>&times;</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
