import React from 'react'
import ConnectWallet from '../components/wallet/connectWallet'
import Sky from './sky'
import "../../node_modules/react-dat-gui/dist/index.css";

const ConnectWalletPage = () => {
  // const [state, ] = useStore()

  // const defaultConfig = {
  //   textureDownsample: 1,
  //   densityDissipation: 0.98,
  //   velocityDissipation: 0.99,
  //   pressureDissipation: 0.8,
  //   pressureIterations: 25,
  //   curl: 30,
  //   splatRadius: 0.005
  // }

  // return (
  //   <div
  //     style={{
  //       height: "100vh",
  //     }}
  //   >
  //     <FluidAnimation config={defaultConfig} />

  //     <div
  //       style={{
  //         position: "absolute",
  //         zIndex: 1,
  //         top: 0,
  //         left: 0,
  //         right: 0,
  //         bottom: 0,
  //         padding: "1em",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         color: "#fff",
  //         fontFamily: 'Quicksand, "Helvetica Neue", sans-serif',
  //         pointerEvents: "none",
  //       }}
  //     >
  //     </div>
  //     <DatGui data={defaultConfig}  style={{
  //         position: "absolute",
  //         zIndex: 1,
  //         inset: "0px",
  //         display: "flex",
  //         alignItems: "center",
  //         marginLeft: "50%",
  //         height: 0,
  //         marginTop: "40%",
  //       }}>
  //       <ConnectWallet></ConnectWallet>
  //       {/* <DatButton
  //         label="Random Splats"
  //         onClick={() => {}}
  //       /> */}
  //     </DatGui>
  //   </div>
  // );

  return(
    <React.Fragment>
      <Sky></Sky>
      <ConnectWallet></ConnectWallet>
    </React.Fragment>
  )
}
export default ConnectWalletPage