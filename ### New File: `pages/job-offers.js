import { useEffect, useState } from 'react';
import Link from 'next/link';

const JobOffers = () => {
    const [jobOffers, setJobOffers] = useState([]);

    useEffect(() => {
        const fetchJobOffers = async () => {
            const res = await fetch('/api/job-offers');
            const data = await res.json();
            setJobOffers(data);
        };

        fetchJobOffers();
    }, []);

    const handleDelete = async (id) => {
        const res = await fetch(`/api/job-offers/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setJobOffers(jobOffers.filter((offer) => offer.id !== id));
        } else {
            alert("Deletion failed!");
        }
    };

    return (
        <div>
            <h1>Job Offers</h1>
            <Link href="/create-job-offer">Create New Job Offer</Link>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobOffers.map((offer) => (
                        <tr key={offer.id}>
                            <td>{offer.title}</td>
                            <td>
                                <Link href={`/edit-job-offer/${offer.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(offer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobOffers;
