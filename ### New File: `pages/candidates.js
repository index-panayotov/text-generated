import { useEffect, useState } from 'react';
import Link from 'next/link';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const res = await fetch('/api/candidates');
            const data = await res.json();
            setCandidates(data);
        };

        fetchCandidates();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/candidates/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setCandidates(candidates.filter((candidate) => candidate.id !== id));
        } else {
            alert("Deletion failed!");
        }
    };

    return (
        <div>
            <h1>Candidates</h1>
            <Link href="/create-candidate">Create New Candidate</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate) => (
                        <tr key={candidate.id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.email}</td>
                            <td>
                                <Link href={`/candidates/${candidate.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(candidate.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Candidates;
