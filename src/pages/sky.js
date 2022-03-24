import React from "react";
import Sky from "react-sky";

import btc from "./btc.png";
import eth from "./eth.png";
import ethBlue from "./eth-blue.png";
import ltc from "./ltc.png";

const SkyComponent = () => {
  return (
    <div>
      <Sky
        images={{
          0: btc,
          1: ethBlue,
          2: ltc,
        }}
        how={100}
        time={40} /* time of animation */
        size={"85px"}
        background={"palettedvioletred"} /* color of background */
      />
    </div>
  );
};

export default SkyComponent;
