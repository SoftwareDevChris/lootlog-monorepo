import "./buttons.css";
import { Button } from "@/components/ui/button/Button";
import { LoadingSpinner } from "../ui/loading/spinner/LoadingSpinner";

type Props = {
  title: string;
  disabled: boolean;
};

export const SubmitFormButton = ({ title, disabled }: Props) => {
  return (
    <Button
      type="submit"
      className="button btn-submit"
      disabled={disabled}
      aria-disabled={disabled}
    >
      {disabled ? <LoadingSpinner size={24} /> : title}
    </Button>
  );
};
