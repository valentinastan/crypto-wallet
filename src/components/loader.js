import React from "react";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

const Loader = (props) => {
  const override = css`
    display: block;
    margin: 15% auto;
    border-color: red;
  `;

  return (
    <React.Fragment>
      <DotLoader
        color="#4FD1C5"
        loading={props.show}
        size={150}
        css={override}
      ></DotLoader>
    </React.Fragment>
  );
};
export default Loader;
