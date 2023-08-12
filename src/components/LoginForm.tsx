import { useState } from "react";
import { login } from "../apiCalls";
import { useNavigate } from "react-router-dom";
import { getGoogleUrl } from "../getGoogleUrl";

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  //see if this works for now, but we should probably use a different method
  // const location = useLocation();
  //let from = ((location.state as any)?.from?.pathname as string) || '/';

  const handleLogin = (username: string, password: string) => {
    login(username, password)
      .then(() => {
        console.log('login successful');
        navigate('/')
      })
      .catch(console.log);
  }
  
  // const handleOathLogin = () => {
  //   navigate(getGoogleUrl('http://localhost:5173/login'))
  // }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={() => handleLogin(username, password)}>Sign in</button>
      {/*TODO: make this work from all pages */}
      <a href={getGoogleUrl('http://localhost:5173/login')}>Sign in with Google</a>
      {/* <button onClick={() => handleOathLogin()}>Sign in with Google</button> */}
    </div>
  )
}