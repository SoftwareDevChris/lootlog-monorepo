import Link from "next/link";
import { ROUTES } from "@/utils/routes";

export const DekstopNavigation = () => {
  return (
    <ul className="order-2 hidden justify-center gap-8 md:flex">
      {ROUTES.map((item) => (
        <li key={item.name}>
          <Link className="cursor-pointer hover:underline" href={item.path}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
