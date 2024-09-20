import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const CompareCandidate = () => {
    const router = useRouter();
    const { id } = router.query;
    const [candidate, setCandidate] = useState(null);
    const [jobOffer, setJobOffer] = useState(null);
    const [cv, setCv] = useState(null);
    const [comparisonResult, setComparisonResult] = useState('');

    useEffect(() => {
        const fetchCandidate = async () => {
            if (id) {
                const res = await fetch(`/api/candidates/${id}`);
                const data = await res.json();
                setCandidate(data);
                const jobRes = await fetch(`/api/job-offers/${data.jobOfferId}`);
                const jobData = await jobRes.json();
                setJobOffer(jobData);
            }
        };

        fetchCandidate();
    }, [id]);

    const handleCvUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('cv', file);

        const res = await fetch(`/api/compare-cv`, {
            method: 'POST',
            body: formData,
        });

        const result = await res.json();
        setComparisonResult(result.comparison);
    };

    return (
        <div>
            <h1>Compare Candidate CV</h1>
            {candidate && jobOffer && (
                <div>
                    <h2>Candidate: {candidate.name}</h2>
                    <h3>Job Offer: {jobOffer.title}</h3>
                    <input type="file" onChange={handleCvUpload} />
                    {comparisonResult && <p>Comparison Result: {comparisonResult}</p>}
                </div>
            )}
        </div>
    );
};

export default CompareCandidate;
