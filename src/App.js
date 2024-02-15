import "./App.css";
import Display from "./display/Display";
import EmployeeForm from "./employeeform/EmployeeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeForm />} />
          <Route path="/product" element={<Display />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
