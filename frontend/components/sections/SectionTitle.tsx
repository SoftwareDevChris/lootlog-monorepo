import Link from "next/link";

export const SectionTitle: React.FC<{
  title: string;
  route?: string;
}> = ({ title, route }) => {
  return (
    <div className="mt-2 flex items-center justify-between">
      <div>
        <h3 className="m-0 text-2xl font-bold capitalize">{title}</h3>
        <div className="bg-orangeCustom700 h-1 w-full" />
      </div>
      {route && (
        <Link
          href={route}
          className="pointer max-w-[10rem] underline-offset-2 hover:underline"
        >
          See all
        </Link>
      )}
    </div>
  );
};
