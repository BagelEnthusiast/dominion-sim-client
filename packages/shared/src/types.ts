
export interface ShoppingListItem {
  id: string;
  card: string;
  quantity: number;
}


export interface ShoppingListItemDTO {
  strategyId: string;
  username: string;
  item: ShoppingListItem;
}


export interface Strategy {
  id: string;
  label: string;
  shoppingList: ShoppingListItem[];
}

export interface StrategyApiRequestBody {
  strat: Strategy;
  username: string;
}


export interface UserData {
  strategies: Strategy[];
}

export interface ApiData {
  [user: string]: UserData;
}