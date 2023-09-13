import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function Employee(props) {
  return (
    <div id="employees">
      <div className="employeeContainer">
        <img src = {props.employee.image}></img>
        <p className='name'>{props.employee.lastName} {props.employee.firstName}</p>
        <p>{props.employee.title} | {props.employee.department}</p>
        <p className='contact'>Contact:</p>
        <p>Email: {props.employee.email}</p>
        <p className='phone'>Phone: {props.employee.phone}</p>
    </div>
    </div>
  )
}

function App() {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])
  const employeeItems = employees.map((employee,index) =>
  <Employee key={index} employee={employee}/>
);
  return (
    <div className="App">
    <h1>EMPLOYEES</h1>
    <ul>
      {employeeItems}
    </ul>
  </div>
  );
}

export default App;
