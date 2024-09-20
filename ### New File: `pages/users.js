import { useEffect, useState } from 'react';
import Link from 'next/link';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setUsers(users.filter((user) => user.id !== id));
        } else {
            alert("Deletion failed!");
        }
    };

    return (
        <div>
            <h1>User Management</h1>
            <Link href="/create-user">Create New User</Link>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>
                                <Link href={`/users/${user.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
