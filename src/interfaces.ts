export interface CardSet {
  name: string
  cards: Array<string>
}

export interface ShoppingListItem {
  id: string
  card: string
  quantity: number
}

export interface Strategy {
  id: string
  label: string
  shoppingList: ShoppingListItem[]
}

export interface UserData {
  strategies: Strategy[]
}

export interface ApiData {
  [user: string]: UserData
}

export interface CardInfo {
  name: string
}

export enum StorageKey {
  Username = 'username'
}

export interface JwtPayload {
  email: string
  exp: number
  iat: number
}