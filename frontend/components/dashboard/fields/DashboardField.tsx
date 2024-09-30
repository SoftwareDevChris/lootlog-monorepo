import "./DashboardField.scss";

const fieldTypes = ["name", "email", "role", "delete"] as const;

type Props = {
  label: string;
  description: string;
  value: string;
  type?: (typeof fieldTypes)[number];
};

export const DashboardField: React.FC<Props> = ({
  label,
  description,
  value,
  type,
}) => {
  return (
    <div className="dashboard-field">
      <div>
        <span className="dashboard-field-label">{label}</span>
        <p className="dashboard-field-description">{description}</p>
      </div>
      <div>
        <span className={`dashboard-field-value ${type}`}>{value}</span>
      </div>
    </div>
  );
};
