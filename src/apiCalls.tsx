import { Strategy, CardSet, UserData, StorageKey } from "./interfaces"
const isDev = import.meta.env.DEV
const apiUrl = isDev ? 'http://localhost:3000' : 'todo'

export async function getUserStrategiesAsync(username: string): Promise<Strategy[]> {
  const response = await fetch(`${apiUrl}/api/user/${username}`)
  const userData = (await response.json()) as unknown as UserData
  return userData.strategies
}

export async function getCardDataAsync(): Promise<string[]> {
  const response = await fetch('https://dominion-sim-api.mpaulweeks.com/cards')
  const dominionApiData = (await response.json()) as unknown as CardSet[]
  const allCards = dominionApiData.map(cs => cs.cards).flat()
  console.log(allCards)
  return allCards
}

//update later to pass in a user argument
export async function updateStrategy(strat: Strategy, username: string): Promise<Response> {
  await Promise.resolve();
  console.log(strat);
  try {
    const response: Response = await fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strat,
        username
      }),
    });

    if (!response.ok) {
      throw new Error('Strategy update response error');
    }
    return response;
  } catch (error) {
    console.error('Error updating strategy', error);
    throw error;
  }
}

export async function login(username: string, password: string): Promise<void> {
  console.log('username and password', username, password)
  try {
    const response: Response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login response error');
    }
    localStorage.setItem(StorageKey.Username, username)
  }
  catch (error) {
    localStorage.removeItem(StorageKey.Username)
    console.error('Error logging in', error);
    throw error;
  }
}