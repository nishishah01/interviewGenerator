import React, { useState } from 'react';

const SignUp = ({ onSignUp }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.email && userDetails.password && userDetails.name && userDetails.phone) {
      if (!validatePassword(userDetails.password)) {
        setError('Password must be at least 8 characters, include one uppercase, one lowercase, one number, and one special character.');
      } else {
        onSignUp(userDetails);
        setError('');
      }
    } else {
      setError('Please fill out all fields.');
    }
  };

  const handleFocus = () => {
    setShowPasswordHint(true);
  };

  const handleBlur = () => {
    setShowPasswordHint(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.leftContainer}>
        <h2 style={styles.heading}>Welcome To JobSpeak!</h2>
        <p style={styles.paragraph}>
          To stay connected with us, please sign up with your personal info.
        </p>
      </div>

      <div style={styles.rightContainer}>
        <h2 style={styles.heading}>Create Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"name="name"placeholder="Full Name"value={userDetails.name}onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"name="email"placeholder="Email"value={userDetails.email}onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"name="phone"placeholder="Phone"value={userDetails.phone}onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"name="password" placeholder="Password"value={userDetails.password}onChange={handleChange}onFocus={handleFocus}onBlur={handleBlur}
            style={styles.input}
          />

          {showPasswordHint && (
            <p style={styles.passwordHint}>
             Password must be 8+ characters, include at least one uppercase letter, one lowercase letter, one number, and one special character.
            </p>
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    fontFamily: 'Montserrat, sans-serif',
  },
  leftContainer: {
    height:'540px',
    width: '50%',
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#007bff',
    borderRadius: '15px',
    color: 'white',
  },
  rightContainer: {
    width: '50%',
    padding: '50px',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '30px',
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#f4f4f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
  },
  inputFocused: {
    borderColor: '#007bff',
  },
  button: {
    padding: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
  passwordHint: {
    fontSize: '12px',
    color: '#999',
  },
};
