import { ChainId } from 'vvs-sdk'
import { getAddress } from '@ethersproject/address'
import { getFetchedTokenList } from "./fetchedTokenList"

const { MAINNET, TESTNET } = ChainId

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const defaultWhitelistedTokens = {
  "name": "VVS Finance Default List",
  "timestamp": "2021-11-09T00:00:00Z",
  "version": {
    "major": 0,
    "minor": 11,
    "patch": 4
  },
  "tags": {
    "mainnet": {
      "name": "mainnet",
      "description": "mainnet tokens"
    },
    "testnet": {
      "name": "testnet",
      "description": "testnet tokens"
    }
  },
  "logoURI": "https://vvs.finance/logo.png",
  "keywords": ["vvs", "default"],
  // TODO: remove tokens when tokenList API works
  "tokens": [
    {
      "name": "WCRO Token",
      "symbol": "WCRO",
      "address": "0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4.svg",
      "tags": ["testnet"]
    },
    {
      "name": "VVS Token",
      "symbol": "VVS",
      "address": "0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a.svg",
      "tags": ["testnet"]
    },
    {
      "name": "ETH Token",
      "symbol": "ETH",
      "address": "0x441d72d584b16105FF1C68DC8bc4517F4DC13E55",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x441d72d584b16105FF1C68DC8bc4517F4DC13E55.svg",
      "tags": ["testnet"]
    },
    {
      "name": "USDC Token",
      "symbol": "USDC",
      "address": "0x321106E51b78E0E9CEBcFeC63C5250F0F3CcB82b",
      "chainId": 338,
      "decimals": 6,
      "logoURI": "./images/tokens/0x321106E51b78E0E9CEBcFeC63C5250F0F3CcB82b.svg",
      "tags": ["testnet"]
    },
    {
      "name": "WBTC Token",
      "symbol": "WBTC",
      "address": "0xFFc8ce84a196420d7bCCDEe980c65364eD1f389F",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0xFFc8ce84a196420d7bCCDEe980c65364eD1f389F.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Tether USD",
      "symbol": "USDT",
      "address": "0x914a8825B29a04ae687625eCDa20B67abd0B58b1",
      "chainId": 338,
      "decimals": 6,
      "logoURI": "./images/tokens/0x914a8825B29a04ae687625eCDa20B67abd0B58b1.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Shiba Inu",
      "symbol": "SHIB",
      "address": "0xF6dF880DF3571ab39a3E09a74D8DB00107e9A43E",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0xF6dF880DF3571ab39a3E09a74D8DB00107e9A43E.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Coffee",
      "symbol": "COFFEE",
      "address": "0x2DA12B663DAAbB01319c75F4ACC121618bA7785C",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x2DA12B663DAAbB01319c75F4ACC121618bA7785C.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Pizza",
      "symbol": "PIZZA",
      "address": "0x5da960c75BD0FeC0eEaf3dc13f92279161b694F4",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x5da960c75BD0FeC0eEaf3dc13f92279161b694F4.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Muffin",
      "symbol": "MUFFIN",
      "address": "0xeCEd065C7AeAA2daff3199ead1544511b2612022",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0xeCEd065C7AeAA2daff3199ead1544511b2612022.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Ginger",
      "symbol": "GINGER",
      "address": "0x67Bc49E7392d5467d758A4fcCA2b0246a4218F25",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x67Bc49E7392d5467d758A4fcCA2b0246a4218F25.svg",
      "tags": ["testnet"]
    },
    {
      "name": "Start",
      "symbol": "START",
      "address": "0x3cB52C062BcBDAa2E88Fbc7A21ACa7765FaA4c4c",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Start1",
      "symbol": "START1",
      "address": "0xC8a9c47fcC89B567784C4fCB017d266C65A6EafF",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Start2",
      "symbol": "START2",
      "address": "0x02a73fC5BDC5Cf58Bd71a49880157433dfE7574E",
      "chainId": 338,
      "decimals": 6,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Rose",
      "symbol": "ROSE",
      "address": "0x7eBDdF6c91E19283a3Ad708754ABAd7A6ad0E657",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Rose1",
      "symbol": "ROSE1",
      "address": "0x401d0c4E76A0566F174321c2e85a618CA718E112",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Rose2",
      "symbol": "ROSE2",
      "address": "0xcCAca9E0741045A56900a384107Da93D27df6c3D",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Ferro Token",
      "symbol": "FER",
      "address": "0x34881f69dfE2A43E1D315455AC47B6aeAb44DBF9",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "devMTD",
      "symbol": "devMTD",
      "address": "0x4003E0885e486Eb12823db489deBc949888a0C8F",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "stgMTD",
      "symbol": "stgMTD",
      "address": "0x84C4F9aD9a0fD56fD3F95EF41D0bcd8DB7C86Be9",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "CROID",
      "symbol": "CROID",
      "address": "0x101BcA936C0AfB0a51786d65b0B130826Cf40257",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0x101BcA936C0AfB0a51786d65b0B130826Cf40257.svg",
      "tags": ["testnet"]
    },
    {
      "name": "devArgo",
      "symbol": "devArgo",
      "address": "0x905131F638B4c7E2A677582A842397077F09F297",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "GMX",
      "symbol": "GMX",
      "address": "0x8e703348d7a536e334e4b5375d79deD7b7Ec706e",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Veno",
      "symbol": "VNO",
      "address": "0x5024739e1dB8d7d1D1D7D3CA06DAAE786c2F27f6",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "",
      "tags": ["testnet"]
    },
    {
      "name": "Fulcrom",
      "symbol": "FUL",
      "address": "0x2e755Bf30938B64281900d2219C3842d509e9D92",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0xfEc5cCcF1471a314ae9fF64F8E529Fd264ECC7De.svg",
      "tags": ["testnet"]
    },
    {
      "name": "ATOM",
      "symbol": "ATOM",
      "address": "0xd9cEEB61010e3a16D8bc1A1Ea1b9960a58C1bF59",
      "chainId": 338,
      "decimals": 6,
      "logoURI": "./images/tokens/0xB888d8Dd1733d72681b30c00ee76BDE93ae7aa93.svg",
      "tags": ["testnet"]
    },
    {
      "name": "LCRO",
      "symbol": "LCRO",
      "address": "0xa5bdfA7874EB20824C4F95350c8D4C71ba054da7",
      "chainId": 338,
      "decimals": 18,
      "logoURI": "./images/tokens/0xa5bdfA7874EB20824C4F95350c8D4C71ba054da7.svg",
      "tags": ["testnet"]
    }
  ]
}

export const getWhitelistedTokens = () => {
  const updatedTokenList = [...defaultWhitelistedTokens.tokens]
  const fetchedTokenList = getFetchedTokenList()

  const defaultTokenSymbolList = defaultWhitelistedTokens.tokens
    .filter((i) => i.chainId.toString() === CHAIN_ID)
    .map((i) => i.symbol)
  
  fetchedTokenList.forEach((tokenListItem) => {
    // condition: local token config does NOT include this token
    // AND this token isSwappable;
    if (!defaultTokenSymbolList.includes(tokenListItem.symbol) && tokenListItem.isSwappable) {
      updatedTokenList.push({
        name: tokenListItem.name,
        symbol: tokenListItem.symbol,
        address: getAddress(tokenListItem.address),
        chainId: CHAIN_ID === MAINNET.toString() ? MAINNET : TESTNET,
        decimals: tokenListItem.decimal,
        logoURI: tokenListItem.logoImageSvgUrl,
        tags: CHAIN_ID === MAINNET.toString() ? ['mainnet'] : ['testnet'],
      })
    }
  })

  return {
    ...defaultWhitelistedTokens,
    tokens: updatedTokenList,
  }
}
