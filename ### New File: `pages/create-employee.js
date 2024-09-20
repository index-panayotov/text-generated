import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateEmployee = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ first_name, last_name, email }),
        });

        if (res.ok) {
            router.push('/employees');
        } else {
            alert("Employee creation failed!");
        }
    };

    return (
        <div>
            <h1>Create Employee</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />

                <input type="submit" value="Create" />
            </form>
        </div>
    );
};

export default CreateEmployee;
