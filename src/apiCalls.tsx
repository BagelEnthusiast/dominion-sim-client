import { Strategy, CardSet, UserData, ShoppingListItem } from "./interfaces"
const isDev = import.meta.env.DEV
const apiUrl = isDev ? 'http://localhost:3000' : 'https://domserver.mrluckywaffles.com'

export async function getUserStrategiesAsync(username: string): Promise<Strategy[]> {
  const response = await fetch(`${apiUrl}/api/user/${username}`)
  const userData = (await response.json()) as unknown as UserData
  return userData.strategies
}

export async function getCardDataAsync(): Promise<string[]> {
  const response = await fetch('https://dominion-sim-api.mpaulweeks.com/cards')
  const dominionApiData = (await response.json()) as unknown as CardSet[]
  const allCards = dominionApiData.map(cs => cs.cards).flat()
  return allCards
}

export async function createStrategy(strat: Strategy, username: string): Promise<Response> {
  try {
    const response: Response = await fetch(`${apiUrl}/user/strategy/create`, {
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
      throw new Error('Create strategy response error');
    }
    return response;
  } catch (error) {
    console.error('Error creating strategy', error);
    throw error;
  }
}

export async function deleteStrategy(id: string, username: string): Promise<Response> {
  try {
    const response: Response = await fetch(`${apiUrl}/user/strategy/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        username
      }),
    });

    if (!response.ok) {
      throw new Error('Delete strategy response error');
    }
    return response;
  } catch (error) {
    console.error('Error deleting strategy', error);
    throw error;
  }
}

export async function createShoppingListItem(strategyId: string, username: string, item: ShoppingListItem): Promise<Response> {
  try {
    const response: Response = await fetch(`${apiUrl}/user/strategy/shoppingList/shoppingListItem/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strategyId,
        username,
        item
      }),
    });

    if (!response.ok) {
      throw new Error('Create shopping list item response error');
    }
    return response;
  } catch (error) {
    console.error('Error creating shopping list item', error);
    throw error;
  }
}

export async function deleteShoppingListItem(strategyId: string, username: string, item: ShoppingListItem): Promise<Response> {
  try {
    const response: Response = await fetch(`${apiUrl}/user/strategy/shoppingList/shoppingListItem/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        strategyId,
        username,
        item
      }),
    });

    if (!response.ok) {
      throw new Error('Delete shopping list item response error');
    }
    return response;
  } catch (error) {
    console.error('Error deleting shopping list item', error);
    throw error;
  }
}

export async function updateStrategy(strat: Strategy, username: string): Promise<Response> {
  console.log(strat);
  try {
    const response: Response = await fetch(`${apiUrl}/user/strategy`, {
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
