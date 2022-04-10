import React from "react";
import Sky from "react-sky";

import btc from "./btc.png";
import ethBlue from "./eth-blue.png";
import ethGold from "./eth-gold.png";
import btcBlue from "./btc-blue.png"
import ltc from "./ltc.png";
import doge from "./doge.png"

const SkyComponent = () => {
  return (
    <div>
      <Sky
        images={{
          0: btc,
          1: ethBlue,
          2: ethGold,
          3: ltc,
          4: btcBlue,
          5: doge,
        }}
        how={100}
        time={40} /* time of animation */
        size={"100px"}
        background={"#1A202C"} //{"palettedvioletred"} /* color of background */
      />
    </div>
  );
};

export default SkyComponent;
