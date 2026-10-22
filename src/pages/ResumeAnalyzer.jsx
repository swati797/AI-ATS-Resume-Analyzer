import React, { useState } from 'react';

export default function ResumeAnalyzer() {
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const analyzeResume = async (e) => {
        e.preventDefault();

        if (!resume) {
            setError('Please upload your resume in PDF format.');
            return;
        }

        if (!jobDescription.trim()) {
            setError('Please enter the job description.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('resume', resume);
            formData.append('jobDescription', jobDescription);

            const response = await fetch('/api/resume/analyze', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Analysis failed.');
            }

            setResult(data);
        } catch (err) {
            setError(err.message || 'Unable to analyze your resume.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <h2>ATS Resume Analyzer</h2>
            <p className="text-muted">
                Upload your resume and compare it with your target job description.
            </p>

            <form onSubmit={analyzeResume} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Upload Resume (PDF)</label>
                    <input
                        type="file"
                        className="form-control"
                        accept=".pdf,application/pdf"
                        onChange={(e) => {
                            setResume(e.target.files?.[0] || null);
                            setResult(null);
                            setError('');
                        }}
                    />
                    <small className="text-muted">Maximum file size: 5 MB.</small>
                </div>

                <div className="mb-3">
                    <label className="form-label">Job Description</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                </button>
            </form>

            {result && (
                <div className="card p-4 mt-4 shadow-sm">
                    <h3>Analysis Results</h3>

                    <h4 className="mt-3">
                        Estimated Match Score: {result.estimatedMatchScore}%
                    </h4>

                    <div className="progress my-3" style={{ height: '20px' }}>
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${result.estimatedMatchScore}%` }}
                            aria-valuenow={result.estimatedMatchScore}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {result.estimatedMatchScore}%
                        </div>
                    </div>

                    <h5>Matching Skills</h5>
                    {result.matchedSkills.length ? (
                        <p>{result.matchedSkills.join(', ')}</p>
                    ) : (
                        <p>No matching skills detected.</p>
                    )}

                    <h5>Missing Skills</h5>
                    {result.missingSkills.length ? (
                        <p>{result.missingSkills.join(', ')}</p>
                    ) : (
                        <p>No missing skills detected.</p>
                    )}

                    <h5>Suggestions</h5>
                    <ul>
                        {result.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>

                    <small className="text-muted">
                        This is an estimated skill match, not an official ATS score.
                    </small>
                </div>
            )}
        </div>
    );
}