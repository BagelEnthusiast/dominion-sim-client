import { getGoogleUrl } from "./getGoogleUrl";
import { apiUrl } from "./DeckApp";

export function LoggedOutApp() {
  return (
    <div className="logged-out-app-container">
      <a href={getGoogleUrl(`${apiUrl}`)}>Sign in with Google</a>
    </div>
  );
}
