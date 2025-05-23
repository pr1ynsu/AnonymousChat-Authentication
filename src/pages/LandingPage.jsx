import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; // make sure db (Firestore) is initialized in firebase.js
import { doc, getDoc } from 'firebase/firestore';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.play().catch(() => {});
  }, []);

  const handleSignIn = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();
      localStorage.setItem('token', token);

      // Fetch Charon name from Firestore
      const docRef = doc(db, 'charons', res.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const charonName = docSnap.data().charonName;
        localStorage.setItem('charonName', charonName);
      } else {
        localStorage.setItem('charonName', 'Charon ?'); // fallback
      }

      navigate('/forum'); // Redirect to forum
    } catch (err) {
      setErrorMsg('Login failed: ' + err.message);
    }
  };

  return (
    <div className="landing-container">
      {/* Screen 1 */}
      <section className="screen screen-one">
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="overlay" />

        <div className="screen-one-content">
          <h1 className="title">Welcome to the River</h1>

          <div className="login-box">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMsg && <p className="error-message">{errorMsg}</p>}

            <button onClick={handleSignIn} className="login-button">
              Sign In
            </button>

            <p className="register-text">
              Don’t have an account?{' '}
              <span className="register-link" onClick={() => navigate('/register')}>
                Register
              </span>
            </p>
          </div>
        </div>

        <audio ref={audioRef} loop>
          <source src="/audio.mp3" type="audio/mpeg" />
        </audio>
      </section>

      {/* Screen 2 */}
      <section className="screen screen-two">
        <img src="/background.jpg" alt="Underworld" className="background-image" />
        <div className="overlay" />
        <div className="screen-two-content">
          <h2 className="subtitle">Charon, Ferryman of the River</h2>
          <p className="poetic-text">
            In the shadows of existence flows the River of the Forgotten—silent, deep, eternal.
            <br /><br />
            Here, Charon waits not for gold, but for words. He ferries souls who seek release in the anonymity of expression.
            <br /><br />
            This forum is not a place. It is a passage.<br />
            Hierarchies rise not from power, but from truth.<br />
            Speak freely. Float silently. Become the current.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
