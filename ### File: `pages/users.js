import { useEffect, useState } from 'react';

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

    return (
        <div>
            <h1>User Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
