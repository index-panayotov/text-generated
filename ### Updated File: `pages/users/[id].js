import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditUser = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState({ email: '', password: '', role: '' });
    const roles = ["Administrator", "HR", "Account Manager", "Manager", "Payroll", "Employee"];

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const res = await fetch(`/api/users/${id}`);
                const data = await res.json();
                setUser(data);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (res.ok) {
            router.push('/users');
        } else {
            alert("Update failed!");
        }
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                /><br /><br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                /><br /><br />

                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                    required
                >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select><br /><br />

                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default EditUser;
