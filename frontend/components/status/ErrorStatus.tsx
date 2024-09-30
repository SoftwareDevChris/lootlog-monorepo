import { FC } from "react";
import "./ErrorStatus.scss";

import { VscError } from "react-icons/vsc";

type Props = {
  message: string;
  optionalMessage?: string;
};

export const ErrorStatus: FC<Props> = ({ message, optionalMessage }) => {
  return (
    <div className="error-status-container">
      <div>
        <VscError />
        <div>
          <p>{message}</p>
          {optionalMessage && <p>{optionalMessage}</p>}
        </div>
      </div>
    </div>
  );
};
