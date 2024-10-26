import "./LoadingScreen.css";

import { LoadingTripleSpinner } from "../spinner/LoadingTripleSpinner";

export const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div>
        <LoadingTripleSpinner />
      </div>
    </div>
  );
};
