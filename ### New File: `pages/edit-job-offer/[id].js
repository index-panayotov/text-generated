import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditJobOffer = () => {
    const router = useRouter();
    const { id } = router.query;
    const [jobOffer, setJobOffer] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchJobOffer = async () => {
            if (id) {
                const res = await fetch(`/api/job-offers/${id}`);
                const data = await res.json();
                setJobOffer(data);
            }
        };

        fetchJobOffer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/job-offers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobOffer),
        });

        if (res.ok) {
            router.push('/job-offers');
        } else {
            alert("Update failed!");
        }
    };

    return (
        <div>
            <h1>Edit Job Offer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={jobOffer.title}
                    onChange={(e) => setJobOffer({ ...jobOffer, title: e.target.value })}
                    required
                /><br /><br />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={jobOffer.description}
                    onChange={(e) => setJobOffer({ ...jobOffer, description: e.target.value })}
                    required
                /><br /><br />

                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default EditJobOffer;
