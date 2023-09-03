import "./DeckApp.css";
import { useAccount } from "./hooks/useAccount";
import { LoggedOutApp } from "./LoggedOutApp";
import { LoggedInApp } from "./LoggedInApp";

const isDev = import.meta.env.DEV;
export const apiUrl = isDev
  ? "http://localhost:5173"
  : "https://dominion-sim-client.vercel.app/";

export interface eventTarget {
  name: { value: string };
  cardList: { value: string };
}

export function DeckApp() {
  console.log("deckApp mounted");
  const username = useAccount();
 
  // const location = useLocation();
  //let from = ((location.state as any)?.from?.pathname as string) || '/';

  return (
    <div>
      {username ? <LoggedInApp username={username} /> : <LoggedOutApp />}
    </div>
  );
}


