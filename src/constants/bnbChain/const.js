import contractUSDT from './contracts/contract-USDT.json'
import contractALU from './contracts/contract-ALU.json'
import contractLUNA from './contracts/contract-LUNA.json'
import contractUNI from './contracts/contract-UNI.json'
import contractDAI from './contracts/contract-DAI.json'
import contractMATIC from './contracts/contract-MATIC.json'
import contractATOM from './contracts/contract-ATOM.json'
import contractLINK from './contracts/contract-LINK.json'
import contractDERC from './contracts/contract-DERC.json'
import contractDON from './contracts/contract-DON.json'
import contractFINA from './contracts/contract-FINA.json'
import contractMGOD from './contracts/contract-MGOD.json'
import contractBUSD from './contracts/contract-BUSD.json'
import contractSUPER from './contracts/contract-SUPER.json'

const constants = {
  USDT: {
    coingeckoId: 'tether',
    tokenAddress: '0x55d398326f99059ff775485246999027b3197955',
    tokenABI: contractUSDT,
  },
  ALU: {
    coingeckoId: 'altura',
    tokenAddress: '0x8263cd1601fe73c066bf49cc09841f35348e3be0',
    tokenABI: contractALU,
  },
  FINA: {
    coingeckoId: 'defina-finance',
    tokenAddress: '0x426c72701833fddbdfc06c944737c6031645c708',
    tokenABI: contractFINA,
  },
  LUNA: {
    coingeckoId: 'terra-luna',
    tokenAddress: '0x156ab3346823B651294766e23e6Cf87254d68962',
    tokenABI: contractLUNA,
  },
  UNI: {
    coingeckoId: 'uniswap',
    tokenAddress: '0xbf5140a22578168fd562dccf235e5d43a02ce9b1',
    tokenABI: contractUNI,
  },
  DAI: {
    coingeckoId: 'dai',
    tokenAddress: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    tokenABI: contractDAI
  },
  MATIC: {
    coingeckoId: 'matic-network',
    tokenAddress: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
    tokenABI: contractMATIC
  },
  ATOM: {
    coingeckoId: 'cosmos',
    tokenAddress: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
    tokenABI: contractATOM
  },
  LINK: {
    coingeckoId: 'chainlink',
    tokenAddress: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
    tokenABI: contractLINK
  },
  DERC: {
    coingeckoId: 'derace',
    tokenAddress: '0x373e768f79c820aa441540d254dca6d045c6d25b',
    tokenABI: contractDERC
  },
  DON: {
    coingeckoId: 'don-key',
    tokenAddress: '0x86B3F23B6e90F5bbfac59b5b2661134Ef8Ffd255',
    tokenABI: contractDON
  },
  MGOD: {
    coingeckoId: 'metagods',
    tokenAddress: '0x10A12969cB08a8d88D4BFB5d1FA317d41e0fdab3',
    tokenABI: contractMGOD
  },
  BUSD: {
    coingeckoId: 'binance-usd',
    tokenAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    tokenABI: contractBUSD
  },
  SUPER: {
    coingeckoId: 'superfarm',
    tokenAddress: '0x51ba0b044d96c3abfca52b64d733603ccc4f0d4d',
    tokenABI: contractSUPER
  },
}

export default constants
