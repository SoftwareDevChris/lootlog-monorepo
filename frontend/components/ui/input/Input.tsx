import { FC, forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  return <input {...props} />;
};
