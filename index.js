'use strict'
const id = document.querySelector("#employeeId");
const emplName = document.querySelector("#employeeName");
const projects = document.querySelector("#employeeProjects");
const department = document.querySelector("#employeeDepartment");
const description = document.querySelector("#employeeDescription");
const age = document.querySelector("#employeeAge");

class Employee  {
    constructor(id, name, department, projects, image){
        this.id = id;
        this.name = name;
        this.department = department;
        this.projects = projects;
        this.image = image;
    }
}

class EmployeeTable {
    constructor(tableElementId, employeeData) {
        this.tableElement = document.querySelector(tableElementId);
        this.tableBody = this.tableElement.querySelector('#employeeTableBody');
        this.employeeData = employeeData;
        this.filteredData = employeeData;
    }

    generateTableRows(){
        this.clearTableRows();

        this.filteredData.forEach(emp => {
            const row = this.generateEmployeeRow(emp);

            this.tableBody.appendChild(row);
        });
    }

    clearTableRows(){
        this.tableBody.innerHTML = "";
    }

    generateEmployeeRow(emp){
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = emp.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        const nameLink = document.createElement("a");
        nameLink.href = `employee.html?id=${emp.id}`;
        nameLink.textContent = emp.name;
        nameCell.appendChild(nameLink);
        row.appendChild(nameCell);

        const departmentCell = document.createElement("td");
        departmentCell.textContent = emp.department;
        row.appendChild(departmentCell);

        const projectsCell = document.createElement("td");
        projectsCell.textContent = emp.projects;
        row.appendChild(projectsCell);

        return row;
    }
    
    searchEmployees(searchTerm, property) {
        this.filteredData = this.employeeData.filter(emp => (
                emp[property].toLowerCase().includes(searchTerm)
            ));
        this.generateTableRows();
    }
}

const employees = [
    new Employee("1", "Flavius Monica", "Marketing", "SEO, Campanii publicitare", "https://i.pravatar.cc/300"),
    new Employee("2", "Cezar Ionel", "IT", "Software development, Aplicatii pentru companii mari", "https://i.pravatar.cc/300"),
    new Employee("3", "Adina Petrut", "Vanzari", "Vanzare produse noi, Training personal nou", "https://i.pravatar.cc/300")
];
console.log(employees);

const initializeApp = () => {
    const employeeTable = new EmployeeTable("#employeeTable", employees);
    employeeTable.generateTableRows();

    const searchForm = document.querySelector("#searchForm");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchInput = document.getElementById("searchKeyword");
        const query = searchInput.value.toLowerCase();
        const searchProperty = document.getElementById("searchProperty");
        const property = searchProperty.value;
        employeeTable.searchEmployees(query, property);
    });
}


const loadEmployeeDetails = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const employeeId = urlParams.get("id");
  
    const employee = employees.find((emp) => emp.id === employeeId);
    if (employee) {
      id.textContent = "Employee ID: " + employee.id;
      emplName.textContent = "Name: " + employee.name;
      department.textContent = "Department: " + employee.department;
      projects.textContent = "Projects: " + employee.projects;
    //   description.textContent = "Description: " + employee.description;
    //   age.textContent = "Age: " + employee.age;
  
      const employeeImage = document.createElement("img");
      employeeImage.setAttribute("src", employee.image);
      employeeImage.setAttribute("alt", employee.name);
      employeeImage.classList.add("employee-image");
      document
        .getElementById("employeeImageContainer")
        .appendChild(employeeImage);
    } else {
      document.getElementById("errorMessage").textContent = "Employee not found.";
    }
  }
