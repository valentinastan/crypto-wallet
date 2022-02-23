import contractGNO from './contracts/contract-GNO.json'
import contractUSDT from './contracts/contract-USDT.json'
import contractBYTES from './contracts/contract-BYTES.json'
import contractLUNA from './contracts/contract-LUNA.json'
import contractUNI from './contracts/contract-UNI.json'

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
}
