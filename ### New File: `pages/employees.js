import { useEffect, useState } from 'react';
import Link from 'next/link';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await fetch('/api/employees');
            const data = await res.json();
            setEmployees(data);
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setEmployees(employees.filter((employee) => employee.id !== id));
        } else {
            alert("Deletion failed!");
        }
    };

    return (
        <div>
            <h1>Employees</h1>
            <Link href="/create-employee">Create New Employee</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.first_name} {employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link href={`/employees/${employee.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;
