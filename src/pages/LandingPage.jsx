import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().catch(() => {});
    }
  }, []);

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
              type="text"
              placeholder="Username"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <button
              onClick={() => navigate('/signin')}
              className="login-button"
            >
              Sign In
            </button>
            <p className="register-text">
              Don’t have an account?{' '}
              <span
                className="register-link"
                onClick={() => navigate('/register')}
              >
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
