import Link from "next/link";

import { FaUserCircle } from "react-icons/fa";

export const UserMenu = () => {
  return (
    <div className="user-menu-wrapper">
      <Link href={"/dashboard/user"}>
        <FaUserCircle size={28} className="cursor-pointer" />
      </Link>
    </div>
  );
};
