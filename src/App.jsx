import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [employees, setEmployees] = useState([]);
  
  const fetchEmployees = async () => {
    const response = await axios.get("https://reqres.in/api/users?per_page=5");
    setEmployees(response.data.data);
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const employeeList = employees.map((employee) => {
    return <li key={employee.id}>{`${employee.first_name} ${employee.last_name}`}</li>;
  });

  return (
    <React.Fragment>
      <h1 data-cy="employee-header">Employee List</h1>
      <ul data-cy="employee-list">{employeeList}</ul>
    </React.Fragment>
  );
};

export default App;
