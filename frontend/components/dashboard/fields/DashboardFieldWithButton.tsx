"use client";

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
