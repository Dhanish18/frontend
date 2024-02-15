import React, { useState } from "react";
import "./EmployeeForm.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    phone: "",
    country: "",
  });

  const createData = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3001/createData",
        formData
      );
      console.log("data created:", response.data);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    if (showToast()) {
      return;
    } else {
      navigate("/product");
    }

    await createData();
  };

  const showToast = () => {
    let errors = [];

    if (!formData.name) {
      errors.push("enter name");
    }
    if (!formData.email) {
      errors.push("enter email");
    }
    if (!formData.dob) {
      errors.push("enter dob");
    }
    if (!formData.country) {
      errors.push("select country");
    }
    if (!formData.gender) {
      errors.push("select gender");
    }
    if (formData.phone.length !== 10) {
      errors.push("enter 10 digit phone number");
    }
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error);
      });
      return true;
    }
    return false;
  };

  return (
    <div className="container">
      <h1>Employee Information Form</h1>
      <form onSubmit={formSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Your Name"
          className="input"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          placeholder="Your email id"
          className="input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          className="input"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="input"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="select">--select--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
        <br />
        <label htmlFor="phone">Ph.no</label>
        <input
          type="number"
          className="input"
          placeholder="Your Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="select"
          className="input"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="select">--select--</option>
          <option value="india">India</option>
          <option value="usa">Usa</option>
          <option value="uk">Uk</option>
          <option value="australia">Australia</option>
        </select>
        <br />
        <button type="submit" className="input" id="submit">
          Submit
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default EmployeeForm;
