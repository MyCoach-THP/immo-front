import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleSendResetEmail = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/password_resets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        navigate('/')
        console.log('Email de réinitialisation envoyé avec succès');
      } else {
        const data = await response.json();
        console.error('Erreur lors de l\'envoi de l\'email :', data.error);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSendResetEmail}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Envoyer l'email de réinitialisation</button>
      </form>
      <div>
        <Link to="/signup">S'inscrire</Link>
        <Link to="/signin">Se connecter</Link>
        <Link to="/">Accueil</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
