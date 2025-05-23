import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // adjust path as needed
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { numberToRoman } from "../utils/roman";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [charonName, setCharonName] = useState("");

  const handleRegister = async () => {
    if (!agreed) {
      setError("You must agree to the terms of the River.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch and update user count in Firestore
      const counterRef = doc(db, "metadata", "userCount");
      const counterSnap = await getDoc(counterRef);

      let newCount = 1;
      if (counterSnap.exists()) {
        newCount = counterSnap.data().count + 1;
        await updateDoc(counterRef, { count: increment(1) });
      } else {
        await setDoc(counterRef, { count: 1 });
        newCount = 1;
      }

      const generatedName = `Charon ${numberToRoman(newCount)}`;
      setCharonName(generatedName);

      // Save Charon name in Firestore and localStorage
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        charonName: generatedName,
      });

      localStorage.setItem("charonName", generatedName);
      localStorage.setItem("token", user.accessToken);

      // Navigate to loading page
      navigate("/loading");
    } catch (err) {
      setError("Registration failed: " + err.message);
    }
  };

  return (
    <div className="register-screen">
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="register-overlay" />

      <div className={`register-wrapper ${agreed ? "slide-up" : ""}`}>
        <div className="guideline-screen">
          <h1 className="title">Welcome to the River</h1>
          <div className="guideline-box">
            <h2>Before You Register</h2>
            <p>
              This is not a place, it’s a passage...<br />
              <br />
              By registering, you agree to float silently or speak freely, with care.
            </p>
            <label className="agree-checkbox">
              <input
                type="checkbox"
                onChange={(e) => setAgreed(e.target.checked)}
                checked={agreed}
              />
              I agree to the terms of the River.
            </label>
          </div>
        </div>

        <div className="form-screen">
          <div className="register-container">
            <div className="register-form">
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
              {error && <p className="error-message">{error}</p>}

              <button onClick={handleRegister} className="register-button">
                Register
              </button>

              {charonName && (
                <div className="charon-name-box">
                  <p>🛶 Your Charon name is:</p>
                  <h3>{charonName}</h3>
                  <p>Redirecting...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
