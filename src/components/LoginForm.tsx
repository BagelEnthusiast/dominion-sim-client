import { useState } from "react";
import { updateUser } from "../apiCalls";

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (username: string, password: string) => {
    updateUser(username, password)
      .then(response => {
        if (response.ok) {
          console.log('login successful');
        } else {
          console.log('login failed');
        }
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