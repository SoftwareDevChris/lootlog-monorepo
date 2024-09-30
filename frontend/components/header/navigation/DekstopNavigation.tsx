import Link from "next/link";
import { ROUTES } from "@/utils/routes";

export const DekstopNavigation = () => {
  return (
    <ul className="desktop-nav-list">
      {ROUTES.map((item) => (
        <li key={item.name}>
          <Link prefetch={false} href={item.path}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
