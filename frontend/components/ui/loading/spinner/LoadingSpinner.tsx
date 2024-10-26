import "./LoadingSpinner.css";

type Props = {
  size?: number;
};

export const LoadingSpinner = ({ size }: Props) => {
  const spinnerSize = size ?? 24;

  return (
    <span
      style={{ width: spinnerSize, height: spinnerSize }}
      className={`loader-normal`}
    ></span>
  );
};
