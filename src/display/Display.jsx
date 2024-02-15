import React, { useEffect, useState } from "react";
import "./Display.css";
import Axios from "axios";
import Edit from "../edit/Edit";

const Display = () => {
  const [formData, setFormData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/getData");
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/deleteData/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    const selectedData = formData.find((data) => data._id === id);
    setLocalFormData(selectedData);
    setVisible(!visible);
  };

  return (
    <div className="container">
      <h1>Details</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.dob}</td>
              <td>{data.gender}</td>
              <td>{data.phone}</td>
              <td>{data.country}</td>
              <td>
                <button id="dlt" onClick={() => handleDelete(data._id)}>
                  delete
                </button>
                <button id="upt" onClick={() => handleUpdate(data._id)}>
                  update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visible && (
        <Edit
          visible={visible}
          setVisible={setVisible}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};

export default Display;
