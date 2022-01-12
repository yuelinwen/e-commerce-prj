import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherPorps }) => {
    return isLoading ? (
      <SpinnerContainer>
        <SpinnerContainer />
      </SpinnerContainer>
    ) : (
      <WrappedComponent {...otherPorps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
