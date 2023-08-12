import Cookies from 'js-cookie'
import * as jose from 'jose'
import { JwtPayload } from "../interfaces"

export function useAccount() {
  if (!Cookies.get('access-token')) return null

  const token: string = Cookies.get('access-token') as string
  //found jose.decodeJwt on these docs: https://github.com/panva/jose/blob/e2836e6aaaddecde053018884abb040908f186fd/docs/functions/util_decode_jwt.decodeJwt.md
  const payload: JwtPayload = jose.decodeJwt(token) as unknown as JwtPayload
  const username = payload.email

  return username
}
