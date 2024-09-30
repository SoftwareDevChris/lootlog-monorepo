import "./LoadingScreen.scss";

import { LoadingSpinner } from "../spinner/LoadingSpinner";

export const LoadingScreen = () => {
  return (
    <div className="loading-screen-wrapper">
      <div className="loading-screen-spinner">
        <LoadingSpinner theme="orange" />
      </div>
    </div>
  );
};
