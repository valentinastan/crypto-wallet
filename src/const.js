import contractGNO from './contracts/contract-GNO.json'
import contractUSDT from './contracts/contract-USDT.json'
import contractBYTES from './contracts/contract-BYTES.json'

const defaultLogo = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F86-865651_bubble-grey-clipart-gray-dot-icon-png-transparent.png&imgrefurl=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2FomTTRb_bubble-grey-clipart-gray-dot-icon-png-transparent%2F&tbnid=sBt08IGlzrOK_M&vet=12ahUKEwjzqPf6xJH2AhUKtBQKHbHaDzAQMygFegUIARDvAQ..i&docid=2AlT61rbBUDVeM&w=860&h=680&q=grey%20dot&ved=2ahUKEwjzqPf6xJH2AhUKtBQKHbHaDzAQMygFegUIARDvAQ'

export default {
  GNO: {
    tokenAddress: '0x6810e776880c02933d47db1b9fc05908e5386b96',
    tokenABI: contractGNO,
    logo: 'https://etherscan.io/token/images/gnosans_32.png'
  },
  USDT: {
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tokenABI: contractUSDT,
    logo: 'https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png'
  },
  BYTES: {
    tokenAddress: '0x7d647b1A0dcD5525e9C6B3D14BE58f27674f8c95',
    tokenABI: contractBYTES,
    logo: defaultLogo
  },
}
