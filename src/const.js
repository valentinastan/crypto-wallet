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

export default {
  GNO: {
    tokenAddress: '0x6810e776880c02933d47db1b9fc05908e5386b96',
    tokenABI: contractGNO,
  },
  USDT: {
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tokenABI: contractUSDT,
  },
  BYTES: {
    tokenAddress: '0x7d647b1A0dcD5525e9C6B3D14BE58f27674f8c95',
    tokenABI: contractBYTES,
  },
  LUNA: {
    tokenAddress: '0xbd31ea8212119f94a611fa969881cba3ea06fa3d',
    tokenABI: contractLUNA,
  },
  UNI: {
    tokenAddress: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    tokenABI: contractUNI,
  },
  SHIB: {
    tokenAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    tokenABI: contractSHIB,
  },
  CRO: {
    tokenAddress: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b',
    tokenABI: contractCRO
  },
  DAI: {
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    tokenABI: contractDAI
  },
  MATIC: {
    tokenAddress: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    tokenABI: contractMATIC
  },
  ATOM: {
    tokenAddress: '0x8D983cb9388EaC77af0474fA441C4815500Cb7BB',
    tokenABI: contractATOM
  },
  LEO: {
    tokenAddress: '0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3',
    tokenABI: contractLEO
  },
  FTT: {
    tokenAddress: '0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9',
    tokenABI: contractFTT
  },
  LINK: {
    tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
    tokenABI: contractLINK
  }
}
