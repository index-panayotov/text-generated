import { useState } from 'react';
import { useRouter } from 'next/router';

const CreateJobOffer = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/job-offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });

        if (res.ok) {
            router.push('/job-offers');
        } else {
            alert("Job offer creation failed!");
        }
    };

    return (
        <div>
            <h1>Create Job Offer</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                /><br /><br />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                /><br /><br />

                <input type="submit" value="Create" />
            </form>
        </div>
    );
};

export default CreateJobOffer;
