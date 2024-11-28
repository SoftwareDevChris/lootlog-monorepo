import Link from "next/link";

import "./SectionTitle.css";

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
        <Link href={route} className="underline-offset-2 hover:underline">
          See all
        </Link>
      )}
    </div>
  );
};
