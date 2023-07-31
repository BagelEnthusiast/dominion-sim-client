import '../DeckApp.css'
import { Link } from 'react-router-dom';

export const SigninButton = () => {
  return (
    <Link to="/login">
      <button className="login-button">Sign in</button>
    </Link>
  );
};
