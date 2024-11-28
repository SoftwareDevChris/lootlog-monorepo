import Link from "next/link";

type Props = {
  fontSize?: number;
};

export const Logo = ({ fontSize }: Props) => {
  return (
    <div className="order-2 col-span-2 flex w-full items-center justify-center self-center justify-self-center md:order-1 md:col-span-1 md:justify-start">
      <Link href="/">
        <h1 className="logo" style={{ fontSize: `${fontSize}px` }}>
          Loot
          <span style={{ fontSize: "inherit" }}>Log</span>
        </h1>
      </Link>
    </div>
  );
};
