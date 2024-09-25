import React, { useState } from 'react';

const FormComponent = ({ setQuestions }) => {
  const [application, setApplication] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    experience: '',
    location: '',
    resume: null,
    comments: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setApplication({ ...application, resume: fileReader.result });
      };
      fileReader.readAsDataURL(e.target.files[0]);
    } else {
      setApplication({ ...application, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = 'https://ai.google.dev/competition/projects/interview-advanced';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer AIzaSyBDY379HV2QzJj8ZizCV3HXUow63fP6jME`,
        },
        body: JSON.stringify({
          applicantName: application.name,
          position: application.position,
          email: application.email,
          phone: application.phone,
          experience: application.experience,
          location: application.location,
        }),
        mode: 'no-cors',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      setError('Failed to generate questions. Please try again.');
    }
  };
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px',  fontFamily: 'Montserrat, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#007bff', textAlign: 'center', marginBottom: '20px' }}>Job Applicant Interview</h2>
      <p style={{ textAlign: 'center', fontSize: '16px', color: '#555' }}>Fill out your details to generate interview questions for the position you're applying for.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <label>
          Full Name:
          <input
            type="text" name="name" value={application.name} onChange={handleChange} placeholder="Ram Doe"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Email:
          <input
            type="email" name="email" value={application.email} onChange={handleChange} placeholder="XYZ@example.com"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel" name="phone" value={application.phone} onChange={handleChange} placeholder="+91 (XXX) XXX-XXXX"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Position Applied For:
          <input
            type="text" name="position" value={application.position} onChange={handleChange} placeholder="Software Engineer"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Experience Level (in years):
          <input
            type="number" name="experience" value={application.experience} onChange={handleChange} placeholder="2"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
          Location:
          <input
            type="text" name="location" value={application.location} onChange={handleChange}
            placeholder="Delhi, Inida"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        <label>
  Upload Resume:
  <input
    type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange}
    required
    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
  />
</label>

        <label>
          Additional Comments:
          <textarea
            name="comments"  value={application.comments} onChange={handleChange} placeholder="Any other information you would like to add."
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', height: '100px' }}
          />
        </label>

        <button type="submit" style={{ padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s' }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
          Generate Questions
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
};

export default FormComponent;
