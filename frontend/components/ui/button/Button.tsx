interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Add custom props here if needed
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`button ${props.className}`}>
      {children}
    </button>
  );
};
