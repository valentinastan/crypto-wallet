import contractGNO from './contracts/contract-GNO.json'
import contractUSDT from './contracts/contract-USDT.json'
import contractBYTES from './contracts/contract-BYTES.json'
import contractLUNA from './contracts/contract-LUNA.json'
import contractUNI from './contracts/contract-UNI.json'
import contractSHIB from './contracts/contract-SHIB.json'
import contractCRO from './contracts/contract-CRO.json'
import contractDAI from './contracts/contract-DAI.json'
import contractMATIC from './contracts/contract-MATIC.json'
import contractATOM from './contracts/contract-ATOM.json'
import contractLEO from './contracts/contract-LEO.json'
import contractFTT from './contracts/contract-FTT.json'
import contractLINK from './contracts/contract-LINK.json'
import contractSAND from './contracts/contract-SAND.json'
import contractXP from './contracts/contract-XP.json'
import contractLQTY from './contracts/contract-LQTY.json'

export default {
  GNO: {
    coingeckoId: 'gnosis',
    tokenAddress: '0x6810e776880c02933d47db1b9fc05908e5386b96',
    tokenABI: contractGNO,
  },
  USDT: {
    coingeckoId: 'tether',
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tokenABI: contractUSDT,
  },
  BYTES: {
    coingeckoId: '',
    tokenAddress: '0x7d647b1A0dcD5525e9C6B3D14BE58f27674f8c95',
    tokenABI: contractBYTES,
  },
  LUNA: {
    coingeckoId: 'wrapped-terra',
    tokenAddress: '0xbd31ea8212119f94a611fa969881cba3ea06fa3d',
    tokenABI: contractLUNA,
  },
  UNI: {
    coingeckoId: 'universe-token',
    tokenAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    tokenABI: contractUNI,
  },
  SHIB: {
    coingeckoId: 'shiba-inu',
    tokenAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    tokenABI: contractSHIB,
  },
  CRO: {
    coingeckoId: 'crypto-com-chain',
    tokenAddress: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
    tokenABI: contractCRO
  },
  DAI: {
    coingeckoId: 'dai',
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    tokenABI: contractDAI
  },
  MATIC: {
    coingeckoId: 'matic-network',
    tokenAddress: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    tokenABI: contractMATIC
  },
  ATOM: {
    coingeckoId: 'cosmos',
    tokenAddress: '0x8D983cb9388EaC77af0474fA441C4815500Cb7BB',
    tokenABI: contractATOM
  },
  LEO: {
    coingeckoId: 'leo-token',
    tokenAddress: '0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3',
    tokenABI: contractLEO
  },
  FTT: {
    coingeckoId: 'ftx-token',
    tokenAddress: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
    tokenABI: contractFTT
  },
  LINK: {
    coingeckoId: 'chainlink',
    tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
    tokenABI: contractLINK
  },
  SAND: {
    coingeckoId: 'the-sandbox',
    tokenAddress: '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
    tokenABI: contractSAND
  },
  XP: {
    coingeckoId: 'polkafantasy',
    tokenAddress: '0x948c70Dc6169Bfb10028FdBE96cbC72E9562b2Ac',
    tokenABI: contractXP
  },
  LQTY: {
    coingeckoId: 'liquity',
    tokenAddress: '0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d',
    tokenABI: contractLQTY
  }
}
