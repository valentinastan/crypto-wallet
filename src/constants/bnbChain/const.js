import contractUSDT from './contracts/contract-USDT.json'
import contractALU from './contracts/contract-ALU.json'
import contractPKR from './contracts/contract-PKR.json'
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
import contractEGLD from './contracts/contract-EGLD.json'
import contractCAKE from './contracts/contract-CAKE.json'
import contractNRV from './contracts/contract-NRV.json'
import contractVAI from './contracts/contract-VAI.json'
import contractXVS from './contracts/contract-XVS.json'
import contractTKO from './contracts/contract-TKO.json'
import contractBELT from './contracts/contract-BELT.json'
import contractALPACA from './contracts/contract-ALPACA.json'

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
  PKR: {
    coingeckoId: 'polker',
    tokenAddress: '0xc49DDe62B4A0810074721fAcA54Aab52369f486a',
    tokenABI: contractPKR,
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
  EGLD: {
    coingeckoId: 'elrond-erd-2',
    tokenAddress: '0xbf7c81fff98bbe61b40ed186e4afd6ddd01337fe',
    tokenABI: contractEGLD
  },
  CAKE: {
    coingeckoId: 'pancakeswap-token',
    tokenAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    tokenABI: contractCAKE
  },
  NRV: {
    coingeckoId: 'nerve-finance',
    tokenAddress: '0x42f6f551ae042cbe50c739158b4f0cac0edb9096',
    tokenABI: contractNRV
  },
  VAI: {
    coingeckoId: 'vai',
    tokenAddress: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
    tokenABI: contractVAI
  },
  ALPACA: {
    coingeckoId: 'alpaca-finance',
    tokenAddress: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
    tokenABI: contractALPACA
  },
  TKO: {
    coingeckoId: 'tokocrypto',
    tokenAddress: '0x9f589e3eabe42ebc94a44727b3f3531c0c877809',
    tokenABI: contractTKO
  },
  XVS: {
    coingeckoId: 'venus',
    tokenAddress: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
    tokenABI: contractXVS
  },
  BELT: {
    coingeckoId: 'belt',
    tokenAddress: '0xe0e514c71282b6f4e823703a39374cf58dc3ea4f',
    tokenABI: contractBELT
  },
}

export default constants
