SELECT employee.id,
employee.first_name,
employee.last_name, 
role.title,
department.name AS department,
role.salary,CONCAT(e.first_name,' ',e.last_name ) AS manager 
FROM employee 
JOIN role ON employee.role_id = role.id
JOIN department ON department.id = role.department_id
LEFT JOIN employee e ON employee.manager_id = e.id