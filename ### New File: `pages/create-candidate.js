import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateCandidate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (res.ok) {
            router.push('/candidates');
        } else {
            alert("Candidate creation failed!");
        }
    };

    return (
        <div>
            <h1>Create Candidate</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

export default CreateCandidate;
