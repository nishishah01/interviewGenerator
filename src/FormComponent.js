import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const FormComponent = ({ setQuestions }) => {
  const [application, setApplication] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    experience: '',
    company: '',
    location: '',
    education: '',
    address: '',
    dob: '',
    citizenOfIndia: false,
    resume: null,
    hobbies: '',
    skills: '',
    projects: '',
    comments: '',
  });

  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBDY379HV2QzJj8ZizCV3HXUow63fP6jME',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Based on the data provided, prepare interview questions for the role of ${application.position} at ${application.company}. 
                      The applicant has the following experience: ${application.experience} years.
                      Location: ${application.location}.
                      Additional Comments: ${application.comments}.
                      Maximum Questions: 5.
                      Please generate 5 questions based on the candidate information for the entered role. 
                      The questions should be numbered and separated by a dollar sign ($) for easier parsing.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const rawQuestions = data.candidates[0].content.parts[0].text;
      const formattedQuestions = rawQuestions.split('$').slice(0,5).map((q) => q.trim());
      setGeneratedQuestions(formattedQuestions);
      setQuestions(formattedQuestions);
      setError('');
      setTranscripts(new Array(formattedQuestions.length).fill(''));
    } catch (err) {
      console.error('Failed to fetch questions:', err);
      setError('Failed to generate questions. Please try again.');
    }
  };

  const handleMicClick = (question) => {
    const utterance = new SpeechSynthesisUtterance(question);
    speechSynthesis.speak(utterance);
  };

  const startListening = (index) => {
    setCurrentQuestionIndex(index);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (currentQuestionIndex !== null) {
      setTranscripts((prevTranscripts) => {
        const updatedTranscripts = [...prevTranscripts];
        updatedTranscripts[currentQuestionIndex] = transcript;
        return updatedTranscripts;
      });
    }
  };

  const resetSpecificTranscript = (index) => {
    setTranscripts((prevTranscripts) => {
      const updatedTranscripts = [...prevTranscripts];
      updatedTranscripts[index] = '';
      return updatedTranscripts;
    });
    if (currentQuestionIndex === index) {
      resetTranscript();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Speech recognition is not supported in this browser.</p>;
  }

  return (
    <div
      style={{
        maxWidth: '750px',
        margin: '0 auto',
        padding: '30px',
        fontFamily: 'Montserrat, sans-serif',
        backgroundColor: '#f4f4f9',
        borderRadius: '15px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.1)')}
    >
      <h2
        style={{
          color: '#007bff',textAlign: 'center',fontWeight: 'bold',marginBottom: '25px',fontSize: '26px',
        }}
      >
        Job Applicant Interview
      </h2>
      <p
        style={{
          textAlign: 'center',fontSize: '17px',color: '#777',marginBottom: '30px',
        }}
      >
        Fill out your details to generate interview questions for the position you're applying for.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',flexDirection: 'column',gap: '20px',
        }}
      >
        <label>
          Full Name:
          <input
            type="text"
             name="name"
            value={application.name}
            onChange={handleChange}
            placeholder="Ram Doe"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={application.email}
            onChange={handleChange}
            placeholder="XYZ@example.com"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={application.phone}
            onChange={handleChange}
            placeholder="+91 (XXX) XXX-XXXX"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Position Applied For:
          <input
            type="text"
            name="position"
            value={application.position}
            onChange={handleChange}
            placeholder="Software Engineer"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Company:
          <input
            type="text"
            name="company"
            value={application.company}
            onChange={handleChange}
            placeholder="Google"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Experience Level (in years):
          <input
            type="number"
            name="experience"
            value={application.experience}
            onChange={handleChange}
            placeholder="2"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Education Status:
          <input
            type="text"
            name="education"
            value={application.education}
            onChange={handleChange}
            placeholder="Bachelor's in Computer Science"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={application.address}
            onChange={handleChange}
            placeholder="1234 Main St, Delhi, India"
            required
            style={inputStyle}
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={application.dob}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        <label>
          Are you a citizen of India?
          <input
            type="checkbox"
            name="citizenOfIndia"
            checked={application.citizenOfIndia}
            onChange={(e) =>
              setApplication({ ...application, citizenOfIndia: e.target.checked })
            }
            style={{ marginLeft: '10px' }}
          />
        </label>

        <label>
          Upload Resume:
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Hobbies:
          <input type="text" name="hobbies" value={application.hobbies} onChange={handleChange} placeholder="Your hobbies" required style={inputStyle} />
        </label>
        <label>
          Skills:
          <input type="text" name="skills" value={application.skills} onChange={handleChange} placeholder="Your skills" required style={inputStyle} />
        </label>

        <label>
          Upload Projects (optional):
          <input
            type="file"
            name="projects"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
        <label>
          Additional Comments:
          <textarea
            name="comments"
            value={application.comments}
            onChange={handleChange}
            placeholder="Any other information you would like to add."
            style={{ ...inputStyle, height: '100px',
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: '15px', backgroundColor: '#007bff',color: 'white',border: 'none',cursor: 'pointer',borderRadius: '5px',transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Generate Questions
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {generatedQuestions.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3
            style={{
              textAlign: 'center',color: '#007bff',fontSize: '22px',marginBottom: '20px',
            }}
          >
            Generated Questions
          </h3>
          <ul
            style={{
              listStyleType: 'none', padding: '0', display: 'flex', flexDirection: 'column',gap: '20px',
            }}
          >
            {generatedQuestions.map((question, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: '#ffffff',border: '1px solid #e0e0e0', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <p>{question}</p>
                <button
                  style={{
                    marginRight: '10px',backgroundColor: listening && currentQuestionIndex === index ? 'red' : 'green',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '5px',cursor: 'pointer',
                  }}
                  onClick={() => startListening(index)} 
                >
                  {listening && currentQuestionIndex === index ? 'Listening...' : 'Start Listening'}
                </button>
                <button
                  style={{
                    backgroundColor: 'green',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '5px',cursor: 'pointer',
                  }}
                  onClick={stopListening}
                >
                  Stop Listening
                </button>
                <button
                  style={{
                    backgroundColor: 'green',color: 'white',border: 'none',padding: '10px 20px',borderRadius: '5px',cursor: 'pointer',marginLeft: '10px',
                  }}
                  onClick={() => resetSpecificTranscript(index)}
                >
                  Reset 
                </button>
                
                <p style={{ marginTop: '10px' }}>{transcripts[index]}</p> 
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};



const inputStyle = {
  width: '100%',
  padding: '12px',
  margin: '8px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
  outline: 'none',
};

export default FormComponent;