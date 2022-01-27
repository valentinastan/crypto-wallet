import contractGNO from './contracts/contract-GNO.json'
import contractUSDT from './contracts/contract-USDT.json'
import contractBYTES from './contracts/contract-BYTES.json'

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
}