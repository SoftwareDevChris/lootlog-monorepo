import Link from "next/link";

import "./SectionTitle.scss";

export const SectionTitle: React.FC<{
  title: string;
  route?: string;
}> = ({ title, route }) => {
  return (
    <div className="section-title-wrapper">
      <div>
        <h3>{title}</h3>
        <div />
      </div>
      {route && (
        <Link prefetch={false} href={route}>
          See all
        </Link>
      )}
    </div>
  );
};
