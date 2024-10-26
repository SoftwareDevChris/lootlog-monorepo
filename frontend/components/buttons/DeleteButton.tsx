"use client";
import "./buttons.css";

import { Button } from "@/components/ui/button/Button";

type Props = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: Props) => {
  return (
    <Button className="btn-delete" onClick={onClick}>
      Delete
    </Button>
  );
};
