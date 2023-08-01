import fetch from "cross-fetch";

const TOKEN_WHITELIST_ENDPOINT = process.env.REACT_APP_TOKEN_WHITELIST_ENDPOINT ?? process.env.TOKEN_WHITELIST_ENDPOINT

export interface FetchedToken {
  id: number
  name: string
  symbol: string
  address: string
  decimal: number
  link: string
  logoImagePngUrl: string
  logoImageSvgUrl: string
  isSwappable: boolean
}

let tokenList: FetchedToken[]
let tokenListValidUntil: number
export const fetchTokenListAsync = async () => {
  if (tokenList && tokenListValidUntil && tokenListValidUntil > Date.now()) return tokenList
  try {
    const result = await fetch(`${TOKEN_WHITELIST_ENDPOINT}/v1/whitelist-tokens`)
      .then((res) => res.json() as Promise<FetchedToken[]>)
      .then((data) => {
        tokenList = data
        tokenListValidUntil = Date.now() + 10 * 60 * 1000

        return data
      })
    return result
  } catch (error) {
    console.error('fetchTokenListAsync error:', error)
    throw error
  }
}

export const getFetchedTokenList = () => {
  if (!tokenList) {
    console.warn('getFetchedTokenList: tokenlist not ready!')
    // fix jest test when tokenList is not ready
    return []
  }

  return tokenList
}
