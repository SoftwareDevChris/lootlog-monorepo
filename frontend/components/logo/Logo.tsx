import Link from "next/link";

type Props = {
  fontSize?: number;
};

export const Logo = ({ fontSize }: Props) => {
  return (
    <div className="logo-wrapper">
      <Link prefetch={false} href="/">
        <h1 className="logo" style={{ fontSize: `${fontSize}px` }}>
          Loot
          <span style={{ fontSize: "inherit" }}>Log</span>
        </h1>
      </Link>
    </div>
  );
};
