import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function OauthApp() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = searchParams.get('t')
    if (token) {
      localStorage.setItem('token', token);
      navigate("/");
    }
  }, [searchParams]);

  return <div>logging in...</div>
}