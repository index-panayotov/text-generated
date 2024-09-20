import { useEffect, useState } from 'react';
import Link from 'next/link';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            const res = await fetch('/api/candidates');
            const data = await res.json();
            setCandidates(data);
        };

        fetchCandidates();
    }, []);

    const filteredCandidates = candidates.filter(candidate => {
        const fullName = candidate.name.toLowerCase();
        const email = candidate.email.toLowerCase();
        const jobTitle = candidate.jobOffer.title.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || email.includes(search) || jobTitle.includes(search);
    });

    return (
        <div>
            <h1>Candidates</h1>
            <input
                type="text"
                placeholder="Search by name, email, or job position"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job Offer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.jobOffer.title}</td>
                            <td>
                                <Link href={`/compare-candidate/${candidate.id}`}>Compare CV</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Candidates;
