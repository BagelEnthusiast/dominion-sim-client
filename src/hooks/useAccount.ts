import { StorageKey } from "../interfaces"

export function useAccount() {
  const username = localStorage.getItem(StorageKey.Username)

  return {
    username,
  }
}
