import { Strategy, CardSet, ApiData } from "./interfaces"

export async function getUserStrategiesAsync(username: string): Promise<Strategy[]> {
  const response = await fetch('http://localhost:3000/api')
  const apiData = (await response.json()) as unknown as ApiData
  return apiData[username].strategies
}

export async function getCardDataAsync(): Promise<string[]> {
  const response = await fetch('https://dominion-sim-api.onrender.com/cards')
  const dominionApiData = (await response.json()) as unknown as CardSet[]
  const allCards = dominionApiData.map(cs => cs.cards).flat()
  console.log(allCards)
  return allCards
}