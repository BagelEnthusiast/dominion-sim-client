import { useState } from "react";
import { login } from "../apiCalls";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = (username: string, password: string) => {
    login(username, password)
      .then(() => {
        console.log('login successful');
        navigate('/')
      })
      .catch(console.log);
  }

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
    </div>
  )
}