import { FC } from "react";

type Props = {
  children: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FC<Props> = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};
