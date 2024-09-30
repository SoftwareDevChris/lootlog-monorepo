"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button/Button";
import { LoadingSpinner } from "@/components/ui/loading/spinner/LoadingSpinner";

type Props = {
  label: string;
  description: string;
  button: React.ReactNode;
};

export const DashboardFieldWithButton = ({
  label,
  description,
  button,
}: Props) => {
  return (
    <div className="dashboard-field">
      <div>
        <span className="dashboard-field-label">{label}</span>
        <p className="dashboard-field-description">{description}</p>
      </div>
      <div>{button}</div>
    </div>
  );
};
