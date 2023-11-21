import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css";

interface Employee {
  image: string,
  lastName: string,
  firstName: string,
  title: string,
  department: string,
  email: string,
  phone: string,
}

interface EmployeeData {
  employee: Employee;
}

const DisplayEmployee : React.FC<EmployeeData> = (props) => {
  return(
    <div id="employees">
      <div className="employeeContainer">
        <img src={props.employee.image} alt="Employee"></img>
        <p className='name'>{props.employee.firstName} {props.employee.lastName}</p>
        <p>{props.employee.title} | {props.employee.department}</p>
        <p className='contact'>Contact:</p>
        <p>Email: {props.employee.email}</p>
        <p className='phone'>Phone: {props.employee.phone}</p>

      </div>
    </div>
  )
}

export default function App(){
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(()=>{
    axios
      .get<Employee[]>('http://localhost:3001/employees')
      .then((response) =>{
        setEmployees(response.data)
      });
  }, []);
  const employeeItems = employees.map((employee, index) => (
    <DisplayEmployee key={index} employee={employee} />
  ));
  return(
    <div className="App">
      <h1>EMPLOYEES</h1>
      <ul>{employeeItems}</ul>
    </div>
  )
}