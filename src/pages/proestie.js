import React, { Component } from "react";

import "../../node_modules/react-dat-gui/dist/index.css";
import DatGui, { DatNumber, DatSelect, DatButton } from "react-dat-gui";


import FluidAnimation from 'react-fluid-animation'

// import image from './lena.png'

const defaultConfig = {
  textureDownsample: 1,
  densityDissipation: 0.98,
  velocityDissipation: 0.99,
  pressureDissipation: 0.8,
  pressureIterations: 25,
  curl: 30,
  splatRadius: 0.005,
};

export default class Prostie extends Component {
  state = {
    config: {
      ...defaultConfig,
    },
  };

  render() {
    const { config } = this.state;

    return (
      <div
        style={{
          height: "100vh",
        }}
      >
        <FluidAnimation config={defaultConfig} animationRef={this._animationRef} />

        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontFamily: 'Quicksand, "Helvetica Neue", sans-serif',
            pointerEvents: "none",
          }}
        >
        </div>
        <DatGui data={config}>
          <DatButton
            label="Random Splats"
            onClick={() => console.log("lalhohohohoho")}
          />
        </DatGui>
      </div>
    );
  }
}
