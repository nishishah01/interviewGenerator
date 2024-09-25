import React, { useState } from 'react';

const SignUp = ({ onSignUp }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.email && userDetails.password && userDetails.name && userDetails.phone) {
      onSignUp(userDetails); 
    } else {
      setError('Please fill out all fields.');
    }
  };

  return (
    <div style={styles.wrapper}>  
      <div style={styles.leftContainer}>
        <h2>Welcome To JobSpeak!</h2>
        <p>To stay connected with us please sign up with your personal info</p>
      
      </div>

      <div style={styles.rightContainer}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userDetails.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={userDetails.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userDetails.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.signUpButton}>SIGN UP</button>
        </form>
         {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '0 20px', 
    fontFamily:'Montserrat, sans-serif'
  },
  leftContainer: {
    flex: 1,
    backgroundColor: '#007bff', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    padding: '20px',
    height: '100%', 
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '100%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #007bff',
    width: '100%',
    outline: 'none',
    boxShadow: 'none',
  },
  signInButton: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '30px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  signUpButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '30px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
  signUpButtonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default SignUp;
